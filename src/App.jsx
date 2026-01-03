
import React, { useState } from 'react';
import BadgeCanvas from './components/BadgeCanvas';
import { Upload, Camera, Type, User, Github } from 'lucide-react';

const PLACEHOLDERS = [
  "Frontend Developer @ ExampleCorp",
  "Student @ NITK",
  "Open Source Contributor",
  "Backend Engineering Enthusiast",
  "DevOps Engineer",
  "FOSS Enthusiast",
  "Linux User",
  "Building cool stuff",
  "Learning Rust",
];

function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background font-base text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">
            <span className="bg-main text-black px-4 py-1 border-2 border-border shadow-shadow rounded-base inline-block transform -rotate-2">
              MangaloreFOSS
            </span>{' '}
            <span className="mt-4 block md:inline md:mt-0">Social Card Generator</span>
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-medium mt-6 bg-white border-2 border-border p-4 rounded-base shadow-shadow">
            Create your personalized MangaloreFOSS Social Card.
            Add your photo, name, and what you build, then share it with the community. 
            <br />
            <span className="font-bold text-main-foreground bg-main px-1 mt-2 inline-block">#followthetiger</span>
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Controls Section */}
          <div className="bg-secondary-background rounded-base shadow-shadow border-2 border-border p-8 space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-3 border-b-2 border-border pb-4">
              <div className="bg-main p-2 border-2 border-border rounded-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <User className="text-black" />
              </div>
              Your Badge Details
            </h2>

            <div className="space-y-6">
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-bold mb-2">Profile Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-base overflow-hidden bg-white border-2 border-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center shrink-0">
                    {userImage ? (
                      <img src={userImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="text-gray-400" size={32} />
                    )}
                  </div>
                  <label className="cursor-pointer bg-main hover:bg-main/90 text-black px-4 py-2 border-2 border-border rounded-base shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2 font-bold">
                    <Upload size={18} />
                    <span>Upload Photo</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                  {userImage && (
                    <button 
                         onClick={() => setUserImage(null)} 
                         className="text-sm bg-red-400 hover:bg-red-500 text-black px-3 py-2 border-2 border-border rounded-base shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-bold"
                    >
                        Remove
                    </button>
                  )}
                </div>
                <p className="mt-2 text-xs font-medium text-gray-600">Recommended: A square image, PNG or JPG.</p>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-bold mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Type size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter the name for your badge"
                    className="block w-full pl-10 pr-3 py-3 border-2 border-border rounded-base focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-white font-medium placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-bold mb-2">Role / What you do (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={PLACEHOLDERS[placeholderIndex]}
                  rows={3}
                  className="block w-full p-3 border-2 border-border rounded-base focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-white font-medium placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-base border-2 border-border shadow-shadow w-full mb-8 relative">
                <div className="absolute -top-3 -right-3 bg-chart-5 text-black text-xs font-bold px-3 py-1 border-2 border-border rounded-base shadow-sm transform rotate-3">
                  LIVE PREVIEW
                </div>
                <BadgeCanvas 
                    name={name} 
                    description={description} 
                    userImage={userImage} 
                />
            </div>
          </div>

        </div>
      </div>
      <footer className="mt-16 text-center border-t-2 border-border pt-8">
        <div className="text-center space-y-4">
                <p className="text-base font-medium">
                    Share on social media with <span className="bg-main px-1 border border-border rounded-sm font-bold">#MangaloreFOSS</span> and <span className="bg-main px-1 border border-border rounded-sm font-bold">#followthetiger</span>
                </p>
        </div>
        <p className="mt-4 font-bold text-sm">Built with ❤️ by FOSS United Mangalore for MangaloreFOSS 2026</p>
        <div className="flex justify-center mt-4">
          <a 
            href="https://github.com/shanjiv177/MangaloreFOSSCard" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 bg-white text-black font-bold py-2 px-4 rounded-base border-2 border-border shadow-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            <Github size={20} />
            <span>Source Code</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
