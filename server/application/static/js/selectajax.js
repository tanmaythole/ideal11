jQuery(function($){
    const addTeams = (data, idEle, selectedId="") => {
        let options = '<option value="">--------</option>';
        for (let i = 0; i < data.length; i++) {
            let isSelected = data[i].id==selectedId?"selected":"";
            options += '<option value="' + data[i].id + '" '+ isSelected + ' >' + data[i].name + "</option>"
        }

        $('select#'+ idEle).html(options);
    }
    
    const getData = (idEle, selectedId='') => {
        let data = {
            series: $('select#id_series').val(),
        }
        if(idEle==='id_away_team'){
            data['team1']=$('select#id_home_team').val()
        }
        
        $.getJSON({
            url: "/application/get_teams/",
            type: "GET",
            data: data,
            success: function(data){
                addTeams(data, idEle, selectedId);
            }
        })
    }

    $(document).ready(function(){
        if(!$('select#id_series').val()){
            $("select#id_home_team").html('<option value="" disabled selected>---------</option>');
            $("select#id_away_team").html('<option value="" disabled selected>---------</option>');
        } else if($('select#id_series').val()){
            let home_team = $('select#id_home_team').val();
            getData('id_home_team', home_team);

            let away_team = $('select#id_away_team').val();
            getData('id_away_team', away_team);
        }
        
        $('#id_series').change(function(){
            getData(idEle='id_home_team')
        });

        $('#id_home_team').change(function(){
            getData(idEle='id_away_team');
        })
    })
})