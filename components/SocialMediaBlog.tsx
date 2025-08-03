import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SocialMediaBlog() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-1/5 border-r px-4 py-6 space-y-6 bg-gray-50">
        <input
          type="text"
          placeholder="Recherche..."
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
        />

        <div>
          <h2 className="font-semibold mb-2">Social Media</h2>
          <ul className="space-y-2">
            <li className="text-sm text-gray-700">Facebook</li>
            <li className="text-sm text-gray-700">Instagram</li>
            <li className="text-sm text-gray-700">TikTok</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Les plus consultés</h2>
          <ul className="space-y-1 text-sm text-gray-800">
            <li className="border-l-2 pl-2 border-black">Uber is working on a car project</li>
            <li className="border-l-2 pl-2 border-black">Sony 50 wireless headphones</li>
            <li className="border-l-2 pl-2 border-black">The power, not for the weak</li>
            <li className="border-l-2 pl-2 border-black">Best action camera you can buy</li>
          </ul>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 px-6 py-8 space-y-8">
        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <img
              src="https://images.unsplash.com/photo-1622346152454-93fef95c2f3b"
              className="rounded-lg w-full h-72 object-cover"
              alt="Hero"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="space-y-2">
              <Badge variant="outline">Facebook</Badge>
              <p className="text-sm text-gray-500">8 min lecture</p>
              <h1 className="text-2xl font-bold text-blue-900 leading-tight">
                UX review presentation
              </h1>
              <p className="text-sm text-gray-600">
                How do you create compelling presentations that wow colleagues and impress managers?
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://randomuser.me/api/portraits/women/68.jpg" />
                <AvatarFallback>OR</AvatarFallback>
              </Avatar>
              <p className="text-xs text-gray-600">Olivia Rhye · 20 Jan 2022</p>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="space-y-2">
              <img
                src={
                  index === 0
                    ? "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf30"
                    : index === 1
                    ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                    : "https://images.unsplash.com/photo-1606813904884-4b3b3eaa58b8"
                }
                alt="Article"
                className="rounded-md h-40 w-full object-cover"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Facebook</Badge>
                  <p className="text-xs text-gray-500">8 min lecture</p>
                </div>
                <h2 className="text-md font-semibold text-blue-900">Migrating to Linear 101</h2>
                <p className="text-sm text-gray-600">
                  Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
