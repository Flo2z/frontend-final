// import {useState} from "react";
// import {useGlobalContext} from "../../context/globalContext";
//
// function Settings() {
//     const { categories, addCategory, deleteCategory } = useGlobalContext();
//     const [newCategory, setNewCategory] = useState('');
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         addCategory({ name: newCategory });
//         setNewCategory('');
//     };
//
//     return (
//         <div className="p-4">
//             <h2 className="text-2xl mb-4">Manage Categories</h2>
//             <form onSubmit={handleSubmit} className="mb-6">
//                 <input
//                     type="text"
//                     value={newCategory}
//                     onChange={(e) => setNewCategory(e.target.value)}
//                     className="p-2 border mr-2"
//                 />
//                 <button type="submit" className="bg-blue-500 text-white p-2">
//                     Add Category
//                 </button>
//             </form>
//             <div className="grid grid-cols-3 gap-4">
//                 {categories.map(category => (
//                     <div key={category._id} className="border p-4 flex justify-between items-center">
//                         <span>{category.name}</span>
//                         <button
//                             onClick={() => deleteCategory(category._id)}
//                             className="text-red-500"
//                         >
//                             Delete
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }