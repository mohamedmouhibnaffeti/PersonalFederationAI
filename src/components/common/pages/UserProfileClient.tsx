"use client"
import Image from "next/image";
import ChartThree from "@/components/Charts/ChartThree";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import axios from "axios"
import UserDetailsModal from "@/components/modals/UserDetails";

function UserProfileClient({personaliytDistribution}: {personaliytDistribution: any}) {
    const router = useRouter()
    const [userID, setUserID] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [personality, setPersonality] = useState("")
    const [id, setId] = useState("")
    useEffect(() => {
        const userid = Cookies.get('userId')
        if (!userid) {
            router.replace('/login')
            return
        }else{
            setUserID(userid)
        }
    }, [router])

    useEffect(()=>{
        if(userID === ""){
            return
        }
        const getPersonalData = async() => {
            const response = await axios.post("/api/getUserDetails", {userID})
            if(response.status !== 200){
                router.replace('/login')
                return
            }else{
                const {user} = response.data
                setName(user.name)
                setEmail(user.email)
                setPersonality(user.personality)
                setId(user.id)
            }
        }
        getPersonalData()
    }, [userID])

    return (
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="relative z-20 h-35 md:h-65">
            <Image
                src={"/images/cover/cover-01.png"}
                alt="profile cover"
                className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                width={970}
                height={260}
                style={{
                width: "auto",
                height: "auto",
                }}
            />
            </div>
            <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3 flex justify-center items-center">
                <p className="text-7xl max-sm:text-5xl font-bold text-sky-950 dark:text-white text-center uppercase">
                {
                    name && `${name[0]}${name[1]}`
                }
                </p>
            </div>
            <div className="mt-4">
                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white capitalize">
                {name}
                </h3>
                <p className="font-medium"> {id} </p>
                <p className="font-medium"> {email} </p>
                <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                <div className="flex flex-col items-center justify-center gap-1 px-4">
                    <span className="text-sm">Dominant Personality</span>
                    <span className="font-semibold text-black dark:text-white">
                    {
                        personality ? personality : "Not Available"
                    }
                    </span>
                </div>
                </div>
                <UserDetailsModal />
                <div className="mt-5 max-w-[28rem] mx-auto">
                <ChartThree personalityDistribution={personaliytDistribution} />
                </div>
            </div>
            </div>
        </div>
    )
}

export default UserProfileClient