from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import Wallet
from application.models import Matches, TeamPlayers, CricketPlayersForMatch, Transactions

@receiver(post_save, sender=Matches)
def onMatchSave(sender, instance, created, **kwargs):
    if created:
        home_team_players = TeamPlayers.objects.filter(team=instance.home_team)
        away_team_players = TeamPlayers.objects.filter(team=instance.away_team)
        for i in home_team_players:
            CricketPlayersForMatch(match=instance, player=i, no_of_shares_for_buy=50, no_of_shares_for_sell=50).save()
        for i in away_team_players:
            CricketPlayersForMatch(match=instance, player=i).save()
    

    if instance.match_status=='completed':
        transactions = Transactions.objects.filter(match=instance.id)
        for transaction in transactions:
            if transaction.trade_type=='buy':
                total_points = transaction.player.total_points
                winning_per_share = total_points if total_points<2*transaction.player.buy_price else 2*transaction.player.buy_price
                transaction.winning = winning_per_share*transaction.no_of_shares
            elif transaction.trade_type=='sell':
                total_points = transaction.player.total_points
                cutoff_price = 2*transaction.player.sell_price
                winning_per_share = cutoff_price - total_points if total_points<cutoff_price else 0
                transaction.winning = winning_per_share*transaction.no_of_shares
            transaction.save()
            wallet = Wallet.objects.get(user=transaction.user.id)
            wallet.winnings += transaction.winning
            wallet.save()
        
    if instance.match_status=='abandoned' or instance.match_status=='refunded':
        transactions = Transactions.objects.filter(match=instance.id)
        for transaction in transactions:
            wallet = Wallet.objects.get(user=transaction.user.id)
            wallet.winnings += transaction.price
            wallet.save()



        
@receiver(post_save, sender=CricketPlayersForMatch)
def cricketPlayersForMatchOnSave(sender, instance, created, **kwargs):
    if created:
        instance.shares_available_for_buy = instance.no_of_shares_for_buy
        instance.shares_available_for_sell = instance.no_of_shares_for_sell
        instance.save()

@receiver(post_save, sender=Transactions)
def transactionsOnSave(sender, instance, created, **kwargs):
    if created:
        player = CricketPlayersForMatch.objects.get(id=instance.player.id)
        if instance.trade_type=='buy':
            player.shares_available_for_buy -= instance.no_of_shares
        elif instance.trade_type=='sell':
            player.shares_available_for_sell -= instance.no_of_shares
        player.save()
        
        wallet = Wallet.objects.get(user=instance.user)
        price = instance.price
        if wallet.deposited>=price:
            wallet.deposited -= price
        else:
            remaining_amt = price - wallet.deposited
            wallet.deposited = 0
            wallet.winnings -= remaining_amt
        wallet.save()