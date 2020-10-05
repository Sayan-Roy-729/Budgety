let user_id = localStorage.getItem("userId");
// code to display the expenses
 firebase.database().ref('users/' + user_id).once('value').then(function(snapshot) {
//   console.log(snapshot.val());
let data =snapshot.val();
let counter =1
 for(let id in data){
     document.querySelector('#expense_table').innerHTML+=`   <tr class="serial_row">
     <td>${counter}</td>
     <td>${data[id].name}</td>
     <td>${data[id].type}</td>
     <td>${data[id].amount}</td>
     <td>${data[id].category}</td>
     <td>${data[id].date}</td>
     <td> <i class="material-icons">border_color</i></td>
                        <td><i class="material-icons">delete_forever</i> </td>
 </tr>`
     console.log(data[id]);
     counter++;

 }

});

document.querySelector('#add_expense').addEventListener('click', function () {
    let expense_name = document.querySelector('#expense_name').value;
    let expense_type = document.querySelector('#expense_type').value;
    let expense_amount = document.querySelector('#expense_amount').value;
    let expense_date = document.querySelector('#expense_date').value;
    let expense_time = document.querySelector('#expense_time').value;
    let expense_category = document.querySelector('#expense_category').value;

    let response = insert_data(expense_name, expense_type, expense_amount, expense_date, expense_time, expense_category)
    if(response){
        // close the modal and display success message
        $('#exampleModal').modal('hide');
        let message=document.querySelector("#message")
        message.innerHTML="<p style='margin-top:30px;background-color:#32be8f;color:white;font-family: sans-serif;padding:10px;text-align:center;justify-content:center;font-size:1.1rem'>Expense Added Successfully</p>"

    }else{
        // displaying error message in the modal itself
    }
});

function insert_data(name, type, amount, date, time, category) {
  
    firebase.database().ref('users/' + user_id).push({
        name: name,
        type: type,
        amount: amount,
        date: date,
        time: time,
        category: category
    }, function (error) {
        return 0;
    });
    return 1;
}