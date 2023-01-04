import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import swal from 'sweetalert'
import { addPostService, deletePostService, updatePostService } from '../../services/CurdServices'

export const postApi = createAsyncThunk(
  
    'postData',
    async (formData :any) => {
        try {

            let response = await addPostService(formData)
            console.log("post response========", response)
            console.log(response)
            if (response.status===200){
              swal("Good job!", "Post successfully", "success");
            }
        else{
          alert('something went wrong')
        }

        } catch (error) {
            console.log(error)
        }
    }
)
export const updateApi = createAsyncThunk(
    'updateApi',

    async (id:any,formData:any) => {
        try {

            let response = await updatePostService(id,formData)
            console.log("ressssssssss",response)
            if (response.status === 201) {
            
                     swal("Good job!", "Post edit successfully", "success");
                    //  navigate("/get");
                   } else {
                  alert("something went wrong");
                 }

        } catch (error) {
            console.log(error)
        }

    }
)
export const deleteApi = createAsyncThunk(
  
    'deleteData',
    async (id :any) => {
        try {

            let response = await deletePostService(id)
            console.log("post response========", response)
            console.log(response)
      

        } catch (error) {
            console.log(error)
        }

    }
)


const userSlice = createSlice({
    name: "users",
    initialState: {
        data: []

    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
       
            .addCase(deleteApi.fulfilled, (state, action) => {
            })
            .addCase(postApi.fulfilled, (state, action) => {

                console.log("**************", action.payload)
                // state.data = action.payload


            })
            // .addCase(updateApi.fulfilled, (state, action) => {
            //    state.data= action.payload
            //     console.log("action update",action.payload)

            // })

    }
})
export default userSlice;

