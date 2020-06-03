const list = document.querySelector('ul');
const form = document.querySelector('form');

const addItem = (item, id) => {
    let html = `
    <li data-id="${id}" class="list-group-item d-flex justify-content-between align-items-center">
    <div>${item.title}</div> <button class="deletebtn far fa-trash-alt delete"></button>
    </li>
    `;

    list.innerHTML += html;
}

const deleteItem = (id) => {
    const items = document.querySelectorAll('li');
    items.forEach(item => {
        if(item.getAttribute('data-id') === id) {
            item.remove();
        }

    });

}

// get itmes
db.collection('list').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            const doc = change.doc;
            if(change.type === 'added') {
                addItem(doc.data(), doc.id);
            } else if (change.type === 'removed'){
                deleteItem(doc.id);
            }
        });
});

// db.collection('list').get().then(snapshot => {
//     // when we have the data
//     snapshot.docs.forEach(doc => {
//         // console.log(doc.id);
//         addItem(doc.data(), doc.id);
//     });
// }).catch((err) => {
//     console.log(err);
// });



// add items
form.addEventListener('submit', e => {
    e.preventDefault();

    const recipe = {
        title: form.recipe.value
    };
    db.collection('list').add(recipe).then(() => {
        console.log('item added');
    }).catch(err => {
        console.log(err);
    });
});

// delete document
list.addEventListener('click', e => {
    // console.log(e);
    if(e.target.tagName === 'BUTTON'){
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('list').doc(id).delete().then(() => {
            console.log('item deleted');
        });
    }
});






// const addForm = document.querySelector('.add');
// const list = document.querySelector('.todos');
// const search = document.querySelector('.search input');

// const generateTemplate = todo => {
//     const html = `
//     <li class="list-group-item d-flex justify-content-between align-items-center">
//                 <span>${todo}</span>
//                 <i class="far fa-trash-alt delete"></i>
//             </li>
//             `;
//     list.innerHTML += html;
// };

// // add todos
// addForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const todo = addForm.add.value.trim();
//     console.log(todo);
//     if(todo.length){
//         generateTemplate(todo);
//         addForm.reset();
//     } 
//     let todo_str = JSON.stringify(todo);

// localStorage.setItem(todo, todo_str);

// let todo_par = JSON.parse(localStorage.getItem(todo));
// console.log(todo_par);
// });

// // delete todos
// list.addEventListener('click', e => {
// if(e.target.classList.contains('delete')){
//     e.target.parentElement.remove();
// }
// });

// const filterTodos = (term) => {
//     Array.from(list.children)
//     .filter((todo) => !todo.textContent.toLowerCase().includes(term))
//     .forEach((todo) => todo.classList.add('filtered'));

//     Array.from(list.children)
//     .filter((todo) => todo.textContent.toLowerCase().includes(term))
//     .forEach((todo) => todo.classList.remove('filtered'))
// };

// // keyup event
// search.addEventListener('keyup', () => {
//     const term = search.value.trim().toLowerCase();
//     filterTodos(term);
// });


