if (localStorage.getItem("name") === null) {
    window.location.href = 'login.html'
}
document.getElementById('user_name').textContent = localStorage.getItem('name');
document.getElementById('user_dp').setAttribute("src", localStorage.getItem("picture"))
// Logout
document.getElementById('logout').addEventListener('click', function () {

    firebase.auth().signOut().then(function () {
        localStorage.removeItem("name");
        localStorage.removeItem("userId");
        window.location.href = 'login.html'
    }).catch(function (error) {
        alert("some error occured")
    })

})

let user_id = localStorage.getItem("userId");
// code to display the expenses
firebase.database().ref('users/' + user_id).once('value', function (snapshot) {
    //   console.log(snapshot.val());
    let data = snapshot.val();
    let counter = 1
    for (let id in data) {
        document.querySelector('#expense_table').innerHTML += `   <tr>
     <td>${counter}</td>
     <td>${data[id].name}</td>
     <td>${data[id].type}</td>
     <td>${data[id].amount}</td>
     <td>${data[id].category}</td>
     <td>${data[id].date}</td>
<td>${data[id].time}</td>
     <td > <i id="edit_data" style="color:green;cursor:pointer" class="material-icons">border_color</i></td>
     <td><i id="delete_data" style="color:red;cursor:pointer;" class="material-icons">delete_forever</i> </td>
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

    let response = insert_data(expense_name, expense_type,
        expense_amount, expense_date, expense_time, expense_category)
    if (response) {
        // close the modal and display success message
        $('#exampleModal').modal('hide');
        let message = document.querySelector("#message")
        message.innerHTML = "<p style='margin-top:30px;background-color:#32be8f;color:white;font-family: sans-serif;padding:10px;text-align:center;justify-content:center;font-size:1.1rem'>Expense Added Successfully</p>"

    } else {
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
document.getElementById('overview').addEventListener('click', function () {
    window.location.href = "overview.html"
})
document.getElementById('edit_data').addEventListener('click',function(){
    alert("working");
})
document.getElementById('delete_data').addEventListener('click',function(){
    alert("working");
})


// ________________________----

// document.getElementById('edit_data').addEventListener('click',function(){
//     alert("working")
    // let expenseId = $(this).parents('td').attr('data-id');
    // let expenseName = $(this).parents('td').attr('data-name');
    // let expenseAmount = $(this).parents('td').attr('data-amount');
    // let expenseCategory = $(this).parents('td').attr('data-category');
    // let expenseDate = $(this).parents('td').attr('data-date');
    // let expenseTime = $(this).parents('td').attr('data-time');
    // let expenseType = $(this).parents('td').attr('data-type');


    // console.log(expenseId, expenseName, expenseAmount, expenseCategory, expenseDate, expenseTime, expenseType)

    // document.querySelector('#update_name').value=expenseName;
    // document.querySelector('#update_type').value=expenseType;
    // document.querySelector('#update_amount').value=expenseAmount;
    // document.querySelector('#update_date').value=expenseDate;
    // document.querySelector('#update_time').value=expenseTime;
    // document.querySelector('#update_category').value=expenseCategory;

    // document.querySelector('#update_expense').addEventListener('click',function (){


    //         let amount= document.querySelector('#update_amount').value
    //         let category= document.querySelector('#update_category').value
    //         let date=document.querySelector('#update_date').value
    //         let name=document.querySelector('#update_name').value
    //         let time= document.querySelector('#update_time').value
    //         let type= document.querySelector('#update_type').value
    //         let response = 0;

    //     if (name === '' && type === '' && amount === '' && time === '' && category === '' && date === '') {

    //         console.log("Please fill al fields")

    //     } else {

    //         firebase.database().ref('/users/' + user_id +'/'+ expenseId).update({
    //             name: name,
    //             type: type,
    //             amount: amount,
    //             date: date,
    //             time: time,
    //             category: category
    //         },function (error) {

    //             response = -1;

    //         });

    //         if (response !== -1){

    //             $('#exampleModal').modal('hide');


    //             document.querySelector('#update_name').value = '';
    //             document.querySelector('#update_type').value = '';
    //             document.querySelector('#update_amount').value = '';
    //             document.querySelector('#update_date').value = '';
    //             document.querySelector('#update_time').value = '';
    //             document.querySelector('#update_category').value = '';

    //         } else {


    //         }
    //     }

    // })
// })








