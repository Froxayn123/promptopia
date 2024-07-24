"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import Profile from "@/components/Profile";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const { id } = useParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${id}/posts`);
    const data = await response.json();
    setUserPosts(data);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    try {
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <Profile name={userName} desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`} data={userPosts} loading={loading} />;
};

export default UserProfile;
