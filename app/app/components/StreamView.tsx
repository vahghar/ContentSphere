"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, Card } from "@/components/ui/card"
import { ChevronUp, ChevronDown, Share2 } from "lucide-react"
import Image from 'next/image'
import Appbar from '../components/Appbar'

type Stream = {
    id: string;
    userId: string;
    url: string;
    extractedId: string;
    type: string;
    title: string;
    smallImg: string;
    bigImg: string;
    upvotes?: number;
    haveUpvoted: boolean;
    downvotes?: number;
}

export default function StreamView({
    creatorId
}:{
    creatorId:string
}) {
    const [videoUrl, setVideoUrl] = useState('')
    const [queue, setQueue] = useState<Stream[]>([])
    const [currentVideo, setCurrentVideo] = useState('')
    const [isVoting, setIsVoting] = useState(false)

    const REFRESH_INTERVAL_MS = 10 * 1000

    async function refreshStreams() {
        try {
            const res = await fetch(`/api/streams/?creatorId=${creatorId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })

            if (!res.ok) {
                throw new Error('Failed to fetch streams')
            }

            const data = await res.json()
            setQueue(data.streams)

            if (data.streams.length > 0 && !currentVideo) {
                setCurrentVideo(data.streams[0].extractedId)
            }
        } catch (error) {
            console.error('Error fetching streams:', error)
        }
    }

    useEffect(() => {
        refreshStreams()
        const interval = setInterval(refreshStreams, REFRESH_INTERVAL_MS)
    
        return () => clearInterval(interval)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/streams/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                creatorId: "77d1de2c-1bf7-45ed-847b-7e180e820f36",
                url: videoUrl,
            })
        })
        setQueue([...queue, await res.json()])
        setVideoUrl('')
    }

    const handleVote = async (id: string, isUpvote: boolean) => {
        if (isVoting) return;
        setIsVoting(true);
        
        const originalQueue = [...queue];
        setQueue(queue => 
            queue.map(video =>
                video.id === id
                    ? {
                        ...video,
                        upvotes: isUpvote ? (video.upvotes ?? 0) + 1 : (video.upvotes ?? 0) - 1,
                        haveUpvoted: !video.haveUpvoted,
                    }
                    : video
            ).sort((a, b) => (b.upvotes ?? 0) - (a.upvotes ?? 0))
        );
    
        try {
            const response = await fetch(`/api/streams/${isUpvote ? "upvote" : "downvote"}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    streamId: id
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to vote');
            }
    
            await refreshStreams();
        } catch (error) {
            console.error('Error voting:', error);
            setQueue(originalQueue);
        } finally {
            setIsVoting(false);
        }
    };

    const handleShare = () => {
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert("Link Copied! The page URL has been copied to your clipboard.");
        }).catch((err) => {
            console.error('Failed to copy: ', err);
            alert("Failed to Copy. There was an error copying the link. Please try again.");
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
          <Appbar />
          <main className="flex-1 container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-3xl font-bold text-purple-400">Viewer's Choice</h1>
                  <Button onClick={handleShare} className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-white">Currently Playing</h2>
                <div className="aspect-video mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&mute=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
    
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-white">Submit a Link</h2>
                <form onSubmit={handleSubmit} className="mb-8">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="Enter YouTube URL"
                      className="flex-1 bg-gray-800 text-white border-gray-700"
                    />
                    <Button onClick={handleSubmit} type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Submit
                    </Button>
                  </div>
                </form>
    
                <h2 className="text-2xl font-semibold mb-4 text-white">Upcoming Content</h2>
                <div className="space-y-4">
                  {queue.map((stream) => (
                    <Card key={stream.id} className="bg-gray-800 border-gray-700">
                      <CardContent className="flex items-center p-4">
                        <Image
                          src={stream.smallImg}
                          alt={stream.title}
                          width={120}
                          height={90}
                          className="rounded-md mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">{stream.title}</h3>
                          <div className="flex items-center mt-2">
                            <Button
                              onClick={() => handleVote(stream.id, stream.haveUpvoted ? false : true)}
                              className="bg-gray-700 hover:bg-gray-950 hover:text-green-400 mb-[5px] p-3 mr-3"
                            >
                              {stream.haveUpvoted ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                            </Button>
                            <span className="text-green-400 mr-4">{stream.upvotes || 0}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
    )
}