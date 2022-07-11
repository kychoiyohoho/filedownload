import React from "react";
import Header from "components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFileDownloader from "hooks/useFileDownloader";
import ExternalInfo from "components/ExternalInfo";

const files = [
  {
    name: "Photo 1",
    thumb:
      "https://images.unsplash.com/photo-1604263439201-171fb8c0fddc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=427&q=80 427w",
    file:
      "https://images.unsplash.com/photo-1604263439201-171fb8c0fddc?rnd=" +
      Math.random(),
    filename: "photo-1.jpg",
  },
  {
    name: "Photo 2",
    thumb:
      "https://images.unsplash.com/photo-1604164388977-1b6250ef26f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80 401w",
    file:
      "https://images.unsplash.com/photo-1604164388977-1b6250ef26f3?rnd=" +
      Math.random(),
    filename: "photo-2.jpg",
  },
  {
    name: "Photo 3",
    thumb:
      "https://images.unsplash.com/photo-1604264849633-67b1ea2ce0a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80 750w",
    file:
      "https://images.unsplash.com/photo-1604264849633-67b1ea2ce0a4?rnd=" +
      Math.random(),
    filename: "photo-3.jpg",
  },
];

const FileDownloader = () => {
  const [downloadFile, downloaderComponentUI] = useFileDownloader();
  console.log("downloadFile",useFileDownloader());
  //useFileDownloader 로 downloadFile 은 useFileDownloader 의 return  download1(e) 을 반환합니다

  //선택된 파일이 downloadFile 함수에 전달됩니다. 
  const download = (file) => downloadFile(file);

  return (
    <>
      <Header title="File downloader with progress bar" />

      <ExternalInfo page="fileDownloader" />

      <div className="row">
        <div className="col text-center">
          <h2>File Downloader with progress bar in react</h2>
          <div className="row mt-3">
            {/* 이미지 데이터를 map 으로 반복문 */}
            {files.map((file, idx) => (
              <div className="col" key={idx}>
                <div className="card ">
                  <div className="card-body" key={idx}>
                    <img className="card-img-top mb-3" src={file.thumb} />
                    <h5 className="card-title">{file.name}</h5>

                    <a
                      className="btn btn-primary cursor-pointer text-white"
                      onClick={() => download(file)}
                      // download 함수에 개별 file 을 전달합니다
                    >
                      Download <FontAwesomeIcon icon="download" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {downloaderComponentUI}
      </div>
    </>
  );
};

export default FileDownloader;
