import {ref} from "vue";

const year = ref(2006)

export default function useUsers(){
    return {year}
}