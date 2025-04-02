import searchimg from "./assets/searchicon.png";
import { constantscontext } from "./App";
import { useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";


const Search = () => {
    const props = useContext(constantscontext);
    const { setproducts } = props;           
    async function search(searchterm: string) {
        const cartsnap = await getDoc(doc(db, "constants","1"));
        const constants = cartsnap.data()?.constants;

        if (searchterm === "") {
            setproducts(constants);
        } else {
            const filtered = constants.filter((product: { title: string; }) => 
                product.title.toLowerCase().includes(searchterm.toLowerCase())
            );
            setproducts(filtered);
        }
    }

    return (
        <div className="relative">
            <input 
                type="text" 
                placeholder="Search" 
                onChange={(e) => search(e.target.value)} 
                className="bg-white rounded-2xl text-center"
            />
            <img 
                src={searchimg} 
                alt="Search Icon" 
                className="absolute w-5 h-5 top-1/2 left-3 transform -translate-y-1/2" 
            />
        </div>
    );
}

export default Search;
