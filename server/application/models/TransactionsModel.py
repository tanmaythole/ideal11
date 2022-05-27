from django.db import models

class Transactions(models.Model):
    trade_type_options = [
        ("buy", "Buy"),
        ("sell", "Sell")
    ]
    user = models.ForeignKey(to='accounts.user', on_delete=models.CASCADE, null=False, blank=False)
    match = models.ForeignKey(to='application.matches', on_delete=models.CASCADE, null=False, blank=False)
    player = models.ForeignKey(to='application.cricketPlayersForMatch', on_delete=models.CASCADE, null=False, blank=False)
    trade_type = models.CharField(choices=trade_type_options, max_length=10, null=False, blank=False)
    no_of_shares = models.IntegerField(default=1)
    price = models.FloatField(default=0.0)
    winning = models.FloatField(default=0)

    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"
    