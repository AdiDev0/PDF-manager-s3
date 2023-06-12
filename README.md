# PDF-manager-app


**The project I have developed is a web application that allows users to upload PDF files through a form, which are then stored in an S3 bucket. The application provides a seamless experience for managing and accessing these uploaded PDFs. Let's explore the key features in more detail:**

1. **PDF Upload Form:**
The web application features a user-friendly form where users can select and upload PDF files. Once a file is submitted, it is securely stored in an S3 bucket, ensuring reliable and scalable storage for the PDF documents.

2. **Dashboard:**
After uploading a PDF, the name of the document is displayed on a dashboard, providing users with a quick overview of the uploaded files. This allows users to easily keep track of the documents they have uploaded.

3. **PDF Viewing and Commenting:**
Users can view the uploaded PDF files directly within the web application. The application provides a convenient interface for navigating through the pages of the PDF for a better reading experience. Additionally, users have the ability to add comments to specific sections of the PDF, enhancing collaboration and facilitating discussions related to the document's content.

4. **Global Link Sharing:**
The web application generates a global link for each uploaded PDF, making it accessible from anywhere. This link can be shared with others, allowing them to view the PDF without requiring them to log in to the application. This feature enables easy sharing and distribution of the PDF documents while maintaining the necessary privacy and security measures.

5. **PDF Deletion:**
In addition to the features mentioned earlier, users also have the ability to delete PDF files from the web application. This functionality provides a convenient way to remove unwanted or outdated documents from the system. Users can select a specific PDF from the dashboard and initiate the deletion process, ensuring control and flexibility over the stored files.

6. **PDF Searching:**
To enhance usability and accessibility, a powerful searching functionality has been implemented within the web application. Users can easily search for PDF files based on their names. By entering relevant keywords or the full name of a document into the search bar, the application quickly retrieves and displays matching results. This feature saves time and effort by enabling users to locate specific PDFs efficiently.

**By combining the capabilities of PDF uploading, document management, viewing, commenting, deleting, searching and global link sharing, this web application offers a comprehensive solution for handling PDF files in a user-friendly and efficient manner.**
## Installation

Install PDF-manager with npm

```bash
   cd client
   npm install
   npm start

   cd server
   npm install 
   npm start
```
    
## API Reference

#### Get all pdfs

```http
  GET /
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|   `empty` | `string` | Fetches PDF data like name, Description from server |

#### Upload Form

```http
  POST /upload
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `string, file`| `string` | **Required**. `headers: {'Content-Type': 'multipart form-data'}` |

#### Get Global link
```http
  GET /pdf/getLink/id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|   `id`    | `string` | **Required** `id` `Fetches Global link of a PDF`|

#### Get pdf

```http
  GET /pdf/id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|   `id`    | `string` | `Fetches PDF data from s3` |


#### Deletes a pdf
```http
  DELETE /id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|   `id`    | `string` | **Required** `id` `Deletes a pdf` |



## Tech Stack

**Client:** React

**Server:** Node, Express

**Database**: mongoDB

**AWS** : s3 


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/AdiDev0)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aditya-raj-521376188/)


## Author

- [@AdiDev](https://github.com/AdiDev0)


## Demo


https://drive.google.com/file/d/1flqUgnAy1Ts6id2JyRqv-kzD0wG0c4Ae/view?usp=sharing
## Screenshots


![Screenshot (55)](https://github.com/AdiDev0/pdf-manager-s3/assets/85286921/6eabb2ad-89a4-4503-97cc-56798ef90f24)

![Screenshot (57)](https://github.com/AdiDev0/pdf-manager-s3/assets/85286921/42faa576-5e46-4069-bd14-617d67fd8c6a)
