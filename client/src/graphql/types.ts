/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
};

export type CreatePostPayload = {
  __typename?: 'CreatePostPayload';
  post: PostType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: CreatePostPayload;
  vote: VotePayload;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationVoteArgs = {
  input: VoteInput;
};

export type PaginatedPostsType = {
  __typename?: 'PaginatedPostsType';
  hasNext: Scalars['Boolean'];
  hasPrevious: Scalars['Boolean'];
  list: Array<PostType>;
};

export type PostMetadataType = {
  __typename?: 'PostMetadataType';
  negativeCount: Scalars['Float'];
  positiveCount: Scalars['Float'];
  voteType?: Maybe<VoteTypeEnum>;
};

export type PostType = {
  __typename?: 'PostType';
  date: Scalars['Date'];
  id: Scalars['String'];
  metadata: PostMetadataType;
  note: Scalars['String'];
  number: Scalars['Float'];
  votes: Array<VoteType>;
};

export type Query = {
  __typename?: 'Query';
  posts: PaginatedPostsType;
};


export type QueryPostsArgs = {
  input: GetAllPostsArgs;
};

export type VotePayload = {
  __typename?: 'VotePayload';
  vote: VoteType;
};

export type VoteType = {
  __typename?: 'VoteType';
  id: Scalars['String'];
  type: VoteTypeEnum;
  userId: Scalars['String'];
};

export enum VoteTypeEnum {
  Negative = 'negative',
  Positive = 'positive'
}

export type CreatePostInput = {
  note: Scalars['String'];
};

export type GetAllPostsArgs = {
  pageNumber: Scalars['Float'];
};

export type VoteInput = {
  postId: Scalars['String'];
  voteType: VoteTypeEnum;
};


export type PostPayloadFragment = (
  { __typename?: 'PostType' }
  & Pick<PostType, 'id' | 'note' | 'date' | 'number'>
  & { metadata: (
    { __typename?: 'PostMetadataType' }
    & Pick<PostMetadataType, 'voteType' | 'negativeCount' | 'positiveCount'>
  ) }
);

export type VotePayloadFragment = (
  { __typename?: 'VoteType' }
  & Pick<VoteType, 'id' | 'type' | 'userId'>
);

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'CreatePostPayload' }
    & { post: (
      { __typename?: 'PostType' }
      & PostPayloadFragment
    ) }
  ) }
);

export type VoteMutationVariables = Exact<{
  input: VoteInput;
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & { vote: (
    { __typename?: 'VotePayload' }
    & { vote: (
      { __typename?: 'VoteType' }
      & VotePayloadFragment
    ) }
  ) }
);

export type PostsQueryVariables = Exact<{
  input: GetAllPostsArgs;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPostsType' }
    & Pick<PaginatedPostsType, 'hasNext' | 'hasPrevious'>
    & { list: Array<(
      { __typename?: 'PostType' }
      & PostPayloadFragment
    )> }
  ) }
);
