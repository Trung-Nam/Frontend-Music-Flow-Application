import { useAuth } from "@/stores/useAuth";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music } from "lucide-react";
import SongTabContent from "./components/SongTabContent";
import AlbumTabContent from "./components/AlbumTabContent";
import { useMusic } from "@/stores/useMusic";
import { useEffect } from "react";

const Admin = () => {
  const { isAdmin, isLoading } = useAuth();
  const { fetchAlbums, fetchSongs, fetchStats } = useMusic();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  if (!isAdmin && !isLoading) return <div>Unauthorized</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
      <Header />

      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-700"
          >
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-700"
          >
            <Music className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongTabContent />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;