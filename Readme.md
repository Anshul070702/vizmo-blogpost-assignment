## Steps to run
> Setup your environment variables that includes MongoDBURI, cloudinaryCredentials, portNumber, accessToken and refreshToken.

> **npm install**

> **npm run dev**

## Rest-API endpoints
**`UserAPI`** - http://localhost:8000/api/v1/user

**`BlogAPI`** - http://localhost:8000/api/v1/blog

**RegisterUser** - userAPI/signup
>*Body should contain fullName, email and password*.

**UserLogin** - userAPI/login
>*Body should contain email and password.*

**UserLogout** - userAPI/logout

**Create Blog** - blogAPI/createBlog
>*Body should contain title,content and images(optional)*

**GetAllBlog** - blogAPI/

**GetBlogById** - blogAPI/:id
>*URL should contain the correct blogId that needs to be retrieved*

**UpdateBlog** - blogAPI/updateBlog/:id
>*Body should contain the updated title and content.*

**DeleteBlog** - blogAPI/deleteBlog/:id
>*URL should contain the correct blogId that needs to be deleted*

**FilterByTitle** - blogAPI/filterByTitle/:title
>*URL should include the title of the blog.*

**FilterByAuthor** - blogAPI/filterByAuthor/:author
>*URL should include the authorName corresponding to which, the blogs will be fetched.*
