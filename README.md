# 🚧 RETIRED PROJECT 🚧

# Premise
Website where you can read and post anonymous funny/sad/unbelievable/...etc
stories from your life. If you ever read r/AskReddit or watched ask reddit videos
on youtube you know it can be quite fun reading other peoples stories. I wanted to deliver that experience.

📝 Project was live for around 2 months before shutting down. 

## ⚙️ Backend Stack
- Node
- Postgres
- GraphQL
- Apollo
- Typescript
- Typeorm

## 🎨 Frontend Stack
- React
- Typescript
- Next
- Apollo
- GraphQL
- Styled Components

## 📱Mobile Stack
- React Native
- Typescript
- GraphQL
- Apollo

## ☁️ Deployment
Everything was hosted on `AWS` with the following
- Database: RDS
- Containers: ECR
- Instances: EC2 (Fargate)
- Other AWS glue necessary

Containerized (docker) `API` and `CLIENT` where automatically deployed to `ECR` on passing `PR` to `master` trough `github actions`

Deployment would run only if 
- API schema build successfully
- Client built successfully
- Client lint passed
- API lint passed
  
Check the pipelines in `./github/workflows` for details
