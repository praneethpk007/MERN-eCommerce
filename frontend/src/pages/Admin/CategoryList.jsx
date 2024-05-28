import { useState } from "react"
import { useCreateCategoryMutation, 
    useDeleteCategoryMutation, 
    useListCategoryQuery, 
    useReadCategoryQuery, 
    useUpdateCategoryMutation } from "../../redux/api/categoryApiSlice"
import { toast } from "react-toastify"
import CategoryForm from "../../components/CategoryForm"
import Model from "../../components/Model"


const CategoryList = () => {
    const {data: categories} = useListCategoryQuery()
    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updatingName, setUpdatingName] = useState('')
    const [modelVisible, setModelVisible] = useState(false)

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    const handleCreateCategory = async(e) => {
        e.preventDefault()
        if(!name) return toast.error("Name is required")
        try {
            const result = await createCategory({name}).unwrap()
            if(result.error){
                toast.error(result.error)
            } else{
                setName('')
                toast.success(`${result.name} created successfully`)
            }
        } catch (error) {
            console.log(error);
            toast.error("Creating category failed, try again.")
        }
    }

    const handleUpdateCategory = async(e) => {
        e.preventDefault()
        if(!updatingName) return toast.error("Name is required")
        try {
            const result = await updateCategory({categoryId: selectedCategory._id, 
                data: {name: updatingName}}).unwrap()
            if(result.error){
                toast.error(result.error)
            } else{
                toast.success(`${result.name} updated successfully`)
                setSelectedCategory(null)
                setUpdatingName('')
                setModelVisible(false)
            }
        } catch (error) {
            console.log(error);
            toast.error("Updating category failed, try again.")
        }
    }

    const handleDeleteCategory = async(e) => {
        e.preventDefault()
        if (!selectedCategory || !selectedCategory._id) {
            toast.error("No category selected for deletion");
            return;
        }
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap()
            if(result.error){
                toast.error(result.error)
            } else{
                toast.success(`${result.name} deleted successfully`)
                setSelectedCategory(null)
                setModelVisible(false)
            }
        } catch (error) {
            console.log(error);
            toast.error("Deleting category failed, try again.")
        }
    }

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
        {/*Admin Menu*/}
        <div className="md:w-3/4 p-3">
            Manage Categories
        <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory}/>
        <br />
        <hr />

        <div className="flex flex-wrap">
            {categories?.map((category) => (
                <div key={category._id}>
                    <button className="bg-black border border-pink-500 text-pink-500 py-2 px-4 
                    rounded-lg m-3 hover:text-white hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500
                    focus: ring-opacity-50" onClick={() => {{
                        setModelVisible(true)
                        setSelectedCategory(category)
                        setUpdatingName(category.name)
                    }}}>{category.name}</button>
                </div>
            ))}
        </div>
        <Model isOpen={modelVisible} onClose={() => setModelVisible(false)}>
            <CategoryForm 
                value={updatingName} 
                setValue={value => setUpdatingName(value)}
                handleSubmit={handleUpdateCategory}
                buttonText="Update"
                handleDelete={handleDeleteCategory}
            />
        </Model>
        </div>
    </div>
  )
}

export default CategoryList