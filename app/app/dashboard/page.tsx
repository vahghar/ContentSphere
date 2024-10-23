"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, Card } from "@/components/ui/card"
import { ChevronUp, ChevronDown } from "lucide-react"
import Image from 'next/image'
import Appbar from '../components/Appbar'
import StreamView from '../components/StreamView'


// Update the type to match your backend response
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

export default function SongVotingPage() {
    const [videoUrl, setVideoUrl] = useState('')
    const [queue, setQueue] = useState<Stream[]>([])
    const [currentVideo, setCurrentVideo] = useState('')
    const [isVoting, setIsVoting] = useState(false)

    const REFRESH_INTERVAL_MS = 10 * 1000

    const creatorId="77d1de2c-1bf7-45ed-847b-7e180e820f36"

    return(
        <StreamView creatorId={creatorId} />
    )
}
