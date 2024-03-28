'use client';

import { useEffect, useState } from 'react';
import { getUserInfo } from '../utils/auth';

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    userId: 'None',
    userName: 'None',
    permission: 'normal',
  });
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    async function fetchUserInfo() {
      let isCacheValid = false;
      const cachedData = localStorage.getItem('userInfo');

      if (cachedData) {
        const cachedUserInfo = JSON.parse(cachedData);
        const currentTime = new Date().getTime();
        // Check if the cache is older than 1 hour
        isCacheValid =
          currentTime - cachedUserInfo.timestamp < 1 * 60 * 60 * 1000;

        if (isCacheValid) {
          // If cache is valid, set the user info from cache
          setUserInfo(cachedUserInfo.data);
          setLoading(false); // Set loading to false
          return; // Return early as we already have valid data
        }
      }

      if (!cachedData || !isCacheValid) {
        // If cache is missed or invalid, call getUserInfo
        const info = await getUserInfo();
        setUserInfo(info);
        // Cache the userInfo along with the current timestamp
        const dataToCache = {
          data: info,
          timestamp: new Date().getTime(),
        };
        if (info.isLogin) {
          localStorage.setItem('userInfo', JSON.stringify(dataToCache));
        }
        setLoading(false); // Set loading to false after fetching data
      }
    }

    fetchUserInfo();
  }, []);

  // If it's still loading, return null or a loading state
  if (loading) {
    return null; // or return { loading: true } if you need to indicate loading state
  }

  return userInfo;
}

export default useUserInfo;
