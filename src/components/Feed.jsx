"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import Loading from "./Loading";

const PromptCardList = ({ data, handleTagClick }) => {
  return data == 0 ? (
    <h1 className="mt-16 font-inter text-sm text-gray-500">No prompt found</h1>
  ) : (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    try {
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter((item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt));
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    const searchResult = filterPrompts(e.target.value);
    setSearchedResults(searchResult);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>

      {/* All Prompts */}
      {allPosts.length == 0 ? <Loading /> : searchText ? <PromptCardList data={searchedResults} handleTagClick={handleTagClick} /> : <PromptCardList data={allPosts} handleTagClick={handleTagClick} />}
    </section>
  );
};

export default Feed;
