"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, Card } from "@/components/ui/card"
import { ChevronUp, ChevronDown, Play, Pause } from "lucide-react"
import Image from 'next/image'

// Update the type to match your backend response
type Stream = {
  id: number;
  userId: string;
  url: string;
  extractedId: string;
  type: string;
  title: string;
  smallImg: string;
  bigImg: string;
  upvotes?: number;
  downvotes?: number;
}

export default function SongVotingPage() {
  const [videoUrl, setVideoUrl] = useState('')
  const [queue, setQueue] = useState<Stream[]>([])
  const [currentVideo, setCurrentVideo] = useState('')

  const REFRESH_INTERVAL_MS = 10*1000

  async function refreshStreams() {
    try {
      // You'll need to pass the creatorId here
      const res = await fetch('/api/streams?creatorId=417623cb-81bb-44af-b6ce-8ffcc318ba1b', {
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
      
      // Set current video if none is playing
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
    e.preventDefault()
    if (videoUrl) {
      try {
        const response = await fetch('/api/streams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            creatorId: '417623cb-81bb-44af-b6ce-8ffcc318ba1b', // You'll need to provide this
            url: videoUrl
          })
        })

        if (!response.ok) {
          throw new Error('Failed to add stream')
        }
        
        // Refresh the queue after adding new song
        refreshStreams()
        setVideoUrl('')
      } catch (error) {
        console.error('Error adding video:', error)
      }
    }
  }

  const handleVote = async (id: number, isUpvote: boolean) => {
    try {
      await fetch("/api/streams/upvote", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          streamId: id
        })
      })
      
      // Refresh streams after voting to get updated counts
      refreshStreams()
    } catch (error) {
      console.error('Error voting:', error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-purple-400">Music Stream Choice</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
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
            <h2 className="text-2xl font-semibold mb-4 text-white">Submit a Song</h2>
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex gap-2">
                <Input 
                  type="text" 
                  value={videoUrl} 
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Enter YouTube URL"
                  className="flex-1 bg-gray-800 text-white border-gray-700"
                />
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Submit
                </Button>
              </div>
            </form>
            
            <h2 className="text-2xl font-semibold mb-4 text-white">Upcoming Songs</h2>
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
                          onClick={() => handleVote(stream.id, true)}
                          className="bg-green-600 hover:bg-green-700 p-2 mr-2"
                        >
                          <ChevronUp size={20} />
                        </Button>
                        <span className="text-green-400 mr-4">{stream.upvotes || 0}</span>
                        <Button 
                          onClick={() => handleVote(stream.id, false)}
                          className="bg-red-600 hover:bg-red-700 p-2 mr-2"
                        >
                          <ChevronDown size={20} />
                        </Button>
                        <span className="text-red-400">{stream.downvotes || 0}</span>
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