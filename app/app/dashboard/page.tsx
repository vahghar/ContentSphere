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

    const creatorId="f7e2b907-ca15-4b4c-ade3-fae274d6e1b7"

    return(
        <StreamView creatorId={creatorId} playVideo={true} />
    )
}
