"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import { useState } from "react"
import { DatePickerDemo } from "./date"

import axios from "axios";

type ScheduleTweetInput = {
  key: String,
  secret: String,
  token: String,
  tokenSecret: String,
  tweet: String,
  date: any,
  time: any,
}

const sendTweet = async (twitterData: ScheduleTweetInput) => {
  const { date, time, tweet, key, secret, token, tokenSecret } = twitterData;
  console.log(time.split(":"))
  date.setHours(...time.split(":"))
  console.log(twitterData, date);
  const isoDate = date.toISOString()
  console.log(isoDate);
  const url = "https://guhys2s4uv24wbh6zoxl3by4xa0imsdb.lambda-url.us-east-2.on.aws/schedule-tweet"
  const postData = {
      "tweet": tweet,
      "schedule_at": isoDate,
      "key": key,
      "secret": secret,
      "token": token,
      "tokenSecret": tokenSecret
  }


  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
   
   let bodyContent = JSON.stringify(postData);
   
   let response = await fetch(url, { 
     method: "POST",
     body: bodyContent,
     headers: headersList,
     mode: "no-cors"
   });
   
   let data = await response.text();
   console.log(data);
}

export default function DemoCreateAccount() {
  const [key, setKey] = useState("");
  const [token, setToken] = useState("");
  const [tokenSecret, setTokenSecret] = useState("");
  const [tweet, setTweet] = useState("");
  const [secret, setSecret] = useState("");
  const [date, setDate] = React.useState<Date>()
  const [time, setTime] = useState<any>('10:00');


  console.log(key, "key")


  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Twitter scheduler</CardTitle>
        <CardDescription>
          Enter your credentials below to schedule a tweet
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">API Key</Label>
          <Input id="email" type="email" placeholder="API Key" onChange={(e) => setKey(e.target.value)}/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">API Secret</Label>
          <Input id="email" type="email" placeholder="API Secret" onChange={(e) => setSecret(e.target.value)}/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Access Token</Label>
          <Input id="email" type="email" placeholder="Access Token" onChange={(e) => setToken(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Access Secret</Label>
          <Input id="email" type="email" placeholder="Access Secret" onChange={(e) => setTokenSecret(e.target.value)}/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Tweet</Label>
          <Input id="email" type="email" placeholder="Tweet your tweet here" onChange={(e) => setTweet(e.target.value)}/>
        </div>
        {/* <div className="grid gap-2">
          <Label htmlFor="password">Tweet</Label>
          <Input id="password" type="password" />
        </div> */}
        {DatePickerDemo(setDate, date)}
        <input aria-label="Time" type="time" onChange={(e) => setTime(e.target.value)}/>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => sendTweet({
          key,
          token,
          tokenSecret,
          date,
          time,
          tweet,
          secret
        })}>Schedule tweet</Button>
      </CardFooter>
    </Card>
  )
}