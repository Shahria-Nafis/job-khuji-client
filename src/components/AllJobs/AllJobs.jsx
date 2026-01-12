

import React, { useEffect, useState, useContext, useMemo, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AllJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [budgetRange, setBudgetRange] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const navigate = useNavigate();

  const pageSize = 9;

  useEffect(() => {
    const load = async (pageToLoad = 1) => {
      try {
        const res = await axios.get("https://job-khuji-server.vercel.app/freelance");
        const all = res.data || [];

        // Simulate server pagination client-side for now
        const sliceStart = 0;
        const sliceEnd = pageToLoad * pageSize;
        const sliced = all.slice(sliceStart, sliceEnd);

        setJobs(sliced);
        setHasMore(sliced.length < all.length);

        setCategories([
          "all",
          ...Array.from(
            new Set(
              all
                .map((job) => job.category)
                .filter(Boolean)
            )
          ),
        ]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    load(page);
  }, [user, page]);

  const loadMore = useCallback(async () => {
    if (isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    try {
      const res = await axios.get("https://job-khuji-server.vercel.app/freelance");
      const all = res.data || [];
      const nextPage = page + 1;
      const sliceEnd = nextPage * pageSize;
      const sliced = all.slice(0, sliceEnd);
      setJobs(sliced);
      setPage(nextPage);
      setHasMore(sliced.length < all.length);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetchingMore(false);
    }
  }, [isFetchingMore, hasMore, page]);

  const observerRef = useRef(null);
  useEffect(() => {
    if (!hasMore) return; // stop observing if no more
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );
    const node = observerRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [hasMore, loadMore]);

  const filteredJobs = useMemo(() => {
    const matchesSearch = (job) => {
      const haystack = `${job.title || ""} ${job.summary || ""} ${job.category || ""}`.toLowerCase();
      return haystack.includes(searchTerm.trim().toLowerCase());
    };

    const matchesCategory = (job) =>
      selectedCategory === "all" || (job.category || "").toLowerCase() === selectedCategory.toLowerCase();

    const budgetValue = (job) => Number(job.budget || job.minBudget || job.maxBudget || 0);

    const matchesBudget = (job) => {
      const val = budgetValue(job);
      if (budgetRange === "all") return true;
      if (budgetRange === "<500") return val > 0 && val < 500;
      if (budgetRange === "500-1000") return val >= 500 && val <= 1000;
      if (budgetRange === "1000-2000") return val > 1000 && val <= 2000;
      if (budgetRange === ">2000") return val > 2000;
      return true;
    };

    const base = (jobs || []).filter((job) => matchesSearch(job) && matchesCategory(job) && matchesBudget(job));

    const byDate = (job) => new Date(job.createdAt || job.updatedAt || job.postedAt || job._id?.toString().substring(0, 8) || 0).getTime();

    const sorted = [...base].sort((a, b) => {
      if (sortBy === "budget-high") return budgetValue(b) - budgetValue(a);
      if (sortBy === "budget-low") return budgetValue(a) - budgetValue(b);
      if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
      if (sortBy === "newest") return byDate(b) - byDate(a);
      return 0; // relevance/default keeps current order
    });

    return sorted;
  }, [jobs, searchTerm, selectedCategory, budgetRange, sortBy]);

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-900 dark:text-gray-100">Loading Jobs...</div>
    );

  if (filteredJobs.length === 0)
    return (
      <div className="p-5 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">All Freelance Jobs</h1>
          <Filters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            budgetRange={budgetRange}
            setBudgetRange={setBudgetRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <div className="text-center mt-10 text-gray-500 dark:text-gray-400">No jobs match your criteria.</div>
        </div>
      </div>
    );

  return (
    <div className="p-5 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">All Freelance Jobs</h1>

        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          budgetRange={budgetRange}
          setBudgetRange={setBudgetRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} onView={() => navigate(`/viewDetails/${job._id}`)} />
          ))}
        </div>

        <div ref={observerRef} className="h-10 flex items-center justify-center">
          {hasMore && !isFetchingMore && (
            <button
              onClick={loadMore}
              className="px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Load more
            </button>
          )}
          {isFetchingMore && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <span className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></span>
              Loading more...
            </div>
          )}
          {!hasMore && <span className="text-gray-400 text-sm">You have reached the end.</span>}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;

const JobCard = ({ job, onView }) => {
  const budgetValue = job.budget || job.minBudget || job.maxBudget;
  const dateLabel = job.postedAt || job.createdAt || job.updatedAt;
  const rating = job.rating || job.averageRating || 4.8;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-4 hover:shadow-lg flex flex-col transition-all duration-200">
      <div className="relative">
        <img
          src={job.coverImage || "https://via.placeholder.com/400x250"}
          alt={job.title}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        {job.category && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">{job.category}</span>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white line-clamp-2">{job.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm line-clamp-2">{job.summary || "No description."}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
        <span className="flex items-center gap-1">💰 <strong className="text-gray-800 dark:text-gray-200">{budgetValue ? `$${budgetValue}` : "N/A"}</strong></span>
        <span className="flex items-center gap-1">⭐ {rating}</span>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
        <span className="flex items-center gap-1">📅 {dateLabel ? new Date(dateLabel).toLocaleDateString() : "Recently"}</span>
        <span className="flex items-center gap-1">👤 {job.postedBy || "Unknown"}</span>
      </div>
      <button
        onClick={onView}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        View Details
      </button>
    </div>
  );
};

const Filters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  budgetRange,
  setBudgetRange,
  sortBy,
  setSortBy,
}) => (
  <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 dark:text-gray-300 mb-1">Search</label>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search by title, summary, category"
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm text-gray-600 dark:text-gray-300 mb-1">Category</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {(categories.length ? categories : ["all"]).map((cat) => (
          <option key={cat} value={cat}>
            {cat === "all" ? "All categories" : cat}
          </option>
        ))}
      </select>
    </div>

    <div className="flex flex-col">
      <label className="text-sm text-gray-600 dark:text-gray-300 mb-1">Budget</label>
      <select
        value={budgetRange}
        onChange={(e) => setBudgetRange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="all">Any budget</option>
        <option value="<500">Under $500</option>
        <option value="500-1000">$500 - $1,000</option>
        <option value="1000-2000">$1,000 - $2,000</option>
        <option value=">2000">Over $2,000</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label className="text-sm text-gray-600 dark:text-gray-300 mb-1">Sort</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="relevance">Relevance</option>
        <option value="newest">Newest</option>
        <option value="budget-high">Budget: High to Low</option>
        <option value="budget-low">Budget: Low to High</option>
        <option value="title">Title A-Z</option>
      </select>
    </div>
  </div>
);


