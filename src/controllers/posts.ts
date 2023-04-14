import express, { Request, Response } from 'express';
import { PostDeleteService, PostGetService, PostPostService, PostUpdateService } from '../services/post.service';


export const postPostController=async(req:Request,res:Response):Promise<any>=>{
   const {title,body,author}=req.body
   const response=await PostPostService(title,body,author);
   res.send(response);
}

export const postGetController=async(req:Request,res:Response)=>{
    const posts=await PostGetService();
    console.log('post',posts)
    res.send(posts);
}

export const PostUpdateController=async (req:Request,res:Response )=>{
    const id=req.params.id
    const {title,body,author}=req.body
    const data={title,body,author};
    const response=await PostUpdateService(data,id);
    res.send(response);
}

export const PostDeleteController =async (req:Request ,res:Response)=>{
    const id=req.params.id
    const response=await PostDeleteService(id);
    res.send(response);
}
