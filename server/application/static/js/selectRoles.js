jQuery(function($){
    const addRoles = (data, selectedItem='') => {
        let options = '<option value="">--------</option>';
        for (let i = 0; i < data.length; i++) {
            let isSelected = data[i][0]==selectedItem?"selected":"";
            options += '<option value="' + data[i][0] + '" '+ isSelected + ' >' + data[i][1] + "</option>"
        }

        $('select#id_role').html(options);
    }

    const getRoles = (selectedItem='') => {
        let data = {
            sport: $('select#id_sport').val()
        }
        
        $.getJSON({
            url: "/application/get_roles",
            type: "GET",
            data: data,
            success: function(data){
                console.log(data)
                addRoles(data, selectedItem)
            }
        })
    }

    $(document).ready(function(){
        if(!$('select#id_sport').val()){
            $('select#id_role').html('<option value="" disabled selected>---------</option>');
        } else if($('select#id_sport').val()){
            let role = $('select#id_role').val();
            getRoles(role);
        }

        $('select#id_sport').change(function(){
            getRoles();
        });
    })
})