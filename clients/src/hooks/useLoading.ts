import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setLoginSuccess } from '../features/authSlice';

export function useLoading() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const User:any = useSelector((state: RootState) => state.authSclice.user);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.post("/refresh",{
                    withCredentials: true,
                });
                console.log("refresh useloading-------",res.data);
                
                const obj = {
                    profile: User,
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.accessToken,
                }
                console.log("after refresh token update", obj);
                
                dispatch(setLoginSuccess(obj));
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        })();
    }, [])

    return { loading };
}