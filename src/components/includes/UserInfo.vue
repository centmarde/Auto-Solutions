<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">User Profile</h1>

        <div class="card shadow-sm">
            <div class="card-body">
                <form @submit.prevent="updateProfile">
                    <div class="row">
                        <!-- Profile Picture -->
                        <div class="col-md-3 text-center">
                            <img :src="profilePicture || 'https://via.placeholder.com/150'" alt="Profile Picture"
                                class="rounded-circle img-thumbnail mb-3" style="width: 150px; height: 150px;">
                            <div class="mb-3">
                                <input type="file" @change="uploadProfilePicture" class="form-control">
                            </div>
                        </div>

                        <div class="col-md-9">
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="username" class="form-label">Username</label>
                                    <input type="text" id="username" v-model="username" class="form-control">
                                </div>
                                <div class="col-md-6">
                                    <label for="gender" class="form-label">Gender</label>
                                    <select id="gender" v-model="gender" class="form-select">
                                        <option disabled value="">Select Gender</option> <!-- Placeholder option -->
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-4">
                                    <label for="firstName" class="form-label">First Name</label>
                                    <input type="text" id="firstName" v-model="firstname" class="form-control">
                                </div>
                                <div class="col-md-4">
                                    <label for="middleName" class="form-label">Middle Name</label>
                                    <input type="text" id="middleName" v-model="middlename" class="form-control">
                                </div>
                                <div class="col-md-4">
                                    <label for="lastName" class="form-label">Last Name</label>
                                    <input type="text" id="lastName" v-model="lastname" class="form-control">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="birthdate" class="form-label">Birthdate</label>
                                    <input type="date" id="birthdate" v-model="birthdate" class="form-control">
                                </div>
                                <div class="col-md-6">
                                    <label for="address" class="form-label">Address</label>
                                    <input type="text" id="address" v-model="address" class="form-control">
                                </div>
                            </div>


                            <!-- Save Button -->
                            <div class="text-end">
                                <button type="submit" class="btn btn-success">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Go Back Button -->
        <div class="text-center mt-4">
            <button type="button" class="btn btn-primary" @click="goBack">
                Go Back
            </button>
        </div>
    </div>
</template>

<script>
import { supabase } from '../../lib/supaBase';
import axios from 'axios';

export default {
    data() {
        return {
            profilePicture: '',  // URL or path to the profile picture
            username: '',
            firstname: '',
            middlename: '',
            lastname: '',
            gender: '',
            birthdate: '',
            address: '',
            supa_id: '' // Add supa_id to data properties
        };
    },
    async mounted() {
        // Fetch the user's existing profile data when the component is mounted
        try {
            const userId = localStorage.getItem('user_id');

            const { data, error } = await supabase
                .from('User')
                .select('*')
                .eq('id', userId)
                .single(); // Fetch only one user record

            if (error) {
                console.error('Error fetching user profile:', error);
                return;
            }

            this.supa_id = data.id; // Save supa_id to data
            // Pre-fill the fields with existing data
            this.profilePicture = data.profilePicture || '';
            this.username = data.username || '';
            this.firstname = data.firstname || '';
            this.middlename = data.middlename || '';
            this.lastname = data.lastname || '';
            this.birthdate = data.birthdate || '';
            this.address = data.address || '';
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    },
    methods: {
        goBack() {
            this.$router.push("/Home");
        },
        uploadProfilePicture(event) {
            const file = event.target.files[0];
            if (file) {
                // Handle profile picture upload (e.g., upload to server or local storage)
                this.profilePicture = URL.createObjectURL(file);
            }
        },
        async updateProfile() {

            // Construct the data object for the profile update
            const updatedData = {
                username: this.username || undefined,
                firstname: this.firstname || undefined,
                middlename: this.middlename || undefined,
                lastname: this.lastname || undefined,
                gender: this.gender || undefined,
                birthdate: this.birthdate || undefined,
                address: this.address || undefined,
            };

            try {
                // Update Supabase
                const { data: supabaseData, error: supabaseError } = await supabase
                    .from('User')
                    .update(updatedData)
                    .eq('id', this.supa_id);

                if (supabaseError) {
                    // Handle Supabase update error
                    console.error('Supabase error:', supabaseError);
                    alert(`Error updating Supabase: ${supabaseError.message}`);
                    return;
                }

                // Update SQLite database via backend
                const response = await axios.post('http://localhost:3001/update-profile', {
                    supa_id: this.supa_id, // Send supa_id for filtering
                    username: this.username || undefined,
                    firstname: this.firstname || undefined,
                    middlename: this.middlename || undefined,
                    lastname: this.lastname || undefined,
                    birthdate: this.birthdate || undefined,
                    address: this.address || undefined,
                });

                if (response.status !== 200) {
                    // Handle unexpected response status
                    throw new Error('Failed to update profile in SQLite');
                }

                alert('Profile updated successfully');

            } catch (error) {
                // General error handling
                console.error('Error updating profile:', error);

                if (error.response) {
                    // Server response error
                    if (error.response.data && error.response.data.message) {
                        alert(`Error: ${error.response.data.message}`);
                    } else {
                        alert('An error occurred: ' + error.message);
                    }
                } else {
                    // Network or unexpected errors
                    alert('Failed to update profile: ' + error.message);
                }
            }
        }
    }
};
</script>

<style scoped>
.card {
    max-width: 900px;
    margin: 0 auto;
}

.text-end {
    margin-top: 20px;
}

.img-thumbnail {
    object-fit: cover;
}
</style>
