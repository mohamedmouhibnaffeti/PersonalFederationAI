"use client"

import { useState } from "react";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

function UserDetailsModal({userID}: {userID: string}) {
    const serverUrl = "http://127.0.0.1:8000/predict";
    const [loading, setLoading] = useState(false);

    const [gender, setGender] = useState("");
    const [relationshipStatus, setRelationshipStatus] = useState("");
    const [education, setEducation] = useState("");
    const [location, setLocation] = useState("");
    const [sports, setSports] = useState("");
    const [favoriteTeams, setFavoriteTeams] = useState("");
    const [friendsCount, setFriendsCount] = useState("");
    const [postsCount, setPostsCount] = useState("");
    const [likesCount, setLikesCount] = useState("");
    const [musicCount, setMusicCount] = useState("");

    const handleSubmit = async () => {
        setLoading(true)
        const newData = {
            gender: gender, 
            relationship_status: relationshipStatus,
            education: education,
            location: location,
            sports: sports.split(","),
            favorite_teams: favoriteTeams.split(","),
            friends_count: parseInt(friendsCount),
            posts_count: parseInt(postsCount),
            likes_count: parseInt(likesCount),
            music_count: parseInt(musicCount),
            user: parseInt(userID)
        };
    
        try {
            const response = await axios.post(serverUrl, newData);
            console.log("Response:", response.data);
            if(response.status === 200){
                setLoading(false)
                window.location.reload()
            }
        } catch (error) {
            setLoading(false)
            console.error("Error:", error);
        }
    };
    

    return (
        <Dialog>
            <DialogTrigger className="bg-blue-950 px-5 text-white p-1 rounded-md shadow-md">Update Personality</DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Update Personality Review</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col w-full gap-4">
                            <div className="relative w-full mt-4">
                                <input
                                    id="gender"
                                    onChange={(e) => setGender(e.target.value)}
                                    name="gender"
                                    type="text"
                                    required
                                    className="border-b text-black border-gray-300 py-1 focus:border-b-2 focus:border-blue-500 transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="gender"
                                    className="absolute left-0 top-1 cursor-text font-medium text-gray-600 transition-all peer-valid:hidden peer-invalid:block peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-500"
                                >Gender</label>
                            </div>

                            <div className="relative w-full">
                                <input
                                    id="relationshipStatus"
                                    onChange={(e) => setRelationshipStatus(e.target.value)}
                                    name="relationshipStatus"
                                    type="text"
                                    required
                                    className="border-b text-black border-gray-300 py-1 focus:border-b-2 focus:border-blue-500 transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="relationshipStatus"
                                    className="absolute left-0 top-1 cursor-text font-medium text-gray-600 transition-all peer-valid:hidden peer-invalid:block peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-500"
                                >Relationship Status</label>
                            </div>

                            <div className="relative w-full">
                                <input
                                    id="education"
                                    onChange={(e) => setEducation(e.target.value)}
                                    name="education"
                                    type="text"
                                    required
                                    className="border-b text-black border-gray-300 py-1 focus:border-b-2 focus:border-blue-500 transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="education"
                                    className="absolute left-0 top-1 cursor-text font-medium text-gray-600 transition-all peer-valid:hidden peer-invalid:block peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-500"
                                >Education</label>
                            </div>

                            <div className="relative w-full">
                                <input
                                    id="location"
                                    onChange={(e) => setLocation(e.target.value)}
                                    name="location"
                                    type="text"
                                    required
                                    className="border-b text-black border-gray-300 py-1 focus:border-b-2 focus:border-blue-500 transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="location"
                                    className="absolute left-0 top-1 cursor-text font-medium text-gray-600 transition-all peer-valid:hidden peer-invalid:block peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-500"
                                >Location</label>
                            </div>

                            <div className="relative w-full">
                                <input
                                    id="sports"
                                    onChange={(e) => setSports(e.target.value)}
                                    name="sports"
                                    type="text"
                                    required
                                    className="border-b text-black border-gray-300 py-1 focus:border-b-2 focus:border-blue-500 transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="sports"
                                    className="absolute left-0 top-1 cursor-text font-medium text-gray-600 transition-all peer-valid:hidden peer-invalid:block peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-500"
                                >Sports (comma-separated)</label>
                            </div>

                            <div className="relative w-full">
                                <input
                                    id="favoriteTeams"
                                    onChange={(e) => setFavoriteTeams(e.target.value)}
                                    name="favoriteTeams"
                                    type="text"
                                    required
                                    className="border-b text-black border-gray-300 py-1 focus:border-b-2 focus:border-blue-500 transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="favoriteTeams"
                                    className="absolute left-0 top-1 cursor-text font-medium text-gray-600 transition-all peer-valid:hidden peer-invalid:block peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-500"
                                >Favorite Teams (comma-separated)</label>
                            </div>

                            <div className="relative w-full">
                                <input
                                    id="friendsCount"
                                    onChange={(e) => setFriendsCount(e.target.value)}
                                    name="friendsCount"
                                    type="number"
                                    required
                                    className="border-b text-black border-gray-300 py-1 focus:border-b-2 focus:border-blue-500 transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="friendsCount"
                                    className="absolute left-0 top-1 cursor-text font-medium text-gray-600 transition-all peer-valid:hidden peer-invalid:block peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-500"
                                >Friends Count</label>
                            </div>

                            <div className="relative w-full">
                                <input
                                    id="postsCount"
                                    onChange={(e) => setPostsCount(e.target.value)}
                                    name="postsCount"
                                    type="number"
                                    required
                                    className="border-b text-black border-gray-300 py-1 focus:border-b-2 focus:border-blue-500 transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="postsCount"
                                    className="absolute left-0 top-1 cursor-text font-medium text-gray-600 transition-all peer-valid:hidden peer-invalid:block peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-500"
                                >Posts Count</label>
                            </div>

                            <div className="relative w-full">
                                <input
                                    id="likesCount"
                                    onChange={(e) => setLikesCount(e.target.value)}
                                    name="likesCount"
                                    type="number"
                                    required
                                    className="border-b text-black border-gray-300 py-1 focus:border-b-2 focus:border-blue-500 transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="likesCount"
                                    className="absolute left-0 top-1 cursor-text font-medium text-gray-600 transition-all peer-valid:hidden peer-invalid:block peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-500"
                                >Likes Count</label>
                            </div>

                            <div className="relative w-full">
                                <input
                                    id="musicCount"
                                    onChange={(e) => setMusicCount(e.target.value)}
                                    name="musicCount"
                                    type="number"
                                    required
                                    className="border-b text-black border-gray-300 py-1 focus:border-b-2 focus:border-blue-500 transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="musicCount"
                                    className="absolute left-0 top-1 cursor-text font-medium text-gray-600 transition-all peer-valid:hidden peer-invalid:block peer-focus:text-sm peer-focus:-top-4 peer-focus:text-blue-500"
                                >Music Count</label>
                            </div>

                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`px-4 py-2 bg-blue-950 text-white rounded-md shadow-md hover:bg-blue-900 transition active:bg-blue-800/70 ${loading ? "cursor-not-allowed bg-blue-800/70" : ""}`}
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-black rounded-md shadow-md hover:bg-gray-400 transition"
                                    onClick={() => {
                                        setGender("");
                                        setRelationshipStatus("");
                                        setEducation("");
                                        setLocation("");
                                        setSports("");
                                        setFavoriteTeams("");
                                        setFriendsCount("");
                                        setPostsCount("");
                                        setLikesCount("");
                                        setMusicCount("");
                                    }}
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default UserDetailsModal;

