import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const Player = () => {
  const { courseId } = useParams();
  const { getToken } = useAuth();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const fetchCourseData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/course/${courseId}`);
      const data = await res.json();
      if (data.success) {
        setCourseData(data.course);
        // Auto-open the first chapter
        setOpenSections({ 0: true });
      }
    } catch (error) {
      toast.error("Error loading course content");
    }
  };

  const markAsCompleted = async (lectureId) => {
    try {
      const token = await getToken();
      const res = await fetch("http://localhost:5000/api/user/update-course-progress", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ courseId, lectureId })
      });
      const data = await res.json();
      if (data.success) toast.success("Lesson marked as finished!");
    } catch (error) {
      toast.error("Failed to update progress");
    }
  };

  useEffect(() => { fetchCourseData(); }, [courseId]);

  if (!courseData) return <p className="text-center mt-20 text-xl font-medium">Loading Course...</p>;

  // Function to extract YouTube ID from full URL
  const getVideoId = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get("v") || url.split("/").pop();
    } catch (e) {
      return null;
    }
  };

  // Logic for the Thumbnail Image Path
  const getImageUrl = (path) => {
    if (!path) return "https://placehold.co/600x400?text=Course+Preview";
    return path.startsWith('http') ? path : `http://localhost:5000${path}`;
  };

  return (
    <>
      <div className="p-4 md:px-36 grid md:grid-cols-2 gap-10 min-h-[85vh] pt-10">
        
        {/* LEFT SIDE: Course Content Structure */}
        <div className="overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Course Content</h2>
          {courseData.courseContent.map((chapter, index) => (
            <div key={index} className="border border-gray-200 rounded-xl mb-3 overflow-hidden shadow-sm">
              <div 
                className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors" 
                onClick={() => setOpenSections(p => ({ ...p, [index]: !p[index] }))}
              >
                <p className="font-semibold text-gray-700">{chapter.chapterTitle}</p>
                <span className="text-gray-400">{openSections[index] ? '−' : '+'}</span>
              </div>
              
              {openSections[index] && (
                <ul className="bg-white">
                  {chapter.chapterContent.map((lec, i) => (
                    <li 
                      key={i} 
                      className={`flex justify-between items-center p-4 text-sm border-t hover:bg-blue-50 transition-all cursor-pointer ${playerData?.lectureId === (lec._id || lec.lectureId) ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}
                      onClick={() => setPlayerData(lec)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 font-mono">{i + 1}</span>
                        <p className="font-medium text-gray-800">{lec.lectureTitle}</p>
                      </div>
                      <span className="text-blue-600 font-semibold text-xs uppercase tracking-wider">Watch Now</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: Video Player Area */}
        <div className="sticky top-10 h-fit">
          {playerData ? (
            <div className="flex flex-col gap-6 animate-fadeIn">
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
                <YouTube 
                  iframeClassName="w-full aspect-video" 
                  videoId={getVideoId(playerData.lectureUrl)} 
                  opts={{ playerVars: { autoplay: 1 } }}
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl text-gray-900">{playerData.lectureTitle}</h3>
                  <p className="text-sm text-gray-500 mt-1">Ready to complete this lesson?</p>
                </div>
                <button 
                  onClick={() => markAsCompleted(playerData._id || playerData.lectureId)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"
                >
                  Mark Finished
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <img 
                src={getImageUrl(courseData.courseThumbnail)} 
                className="rounded-2xl shadow-xl w-full object-cover aspect-video bg-gray-100" 
                alt="Select a lesson"
              />
              <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-2xl">
                <p className="text-gray-500 font-medium">Select a lecture from the list to start learning.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;

