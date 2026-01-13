import { ref, watch } from "vue";
const users = ref([1,2,3,4,5])
if (localStorage.users) {
    users.value=JSON.parse(localStorage.users)
}
watch(users,()=>{
    localStorage.users=JSON.stringify(users.value)
},{deep:true})

function addUser(newUser) {
    users.value.push(newUser)
}

function removeUser(id){
    users.value.splice(id,1)
}



export default function useUser(params) {
    return {users, addUser, removeUser}
}