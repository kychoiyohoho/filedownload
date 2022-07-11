import Downloader from "components/Downloader";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const useFileDownloader = () => {
  const [files, setFiles] = useState([]);

  //FileDownloader 에서 받은 file 을 setFiles 에 입력하는데, fileList 는 빈 배열이다, 왜 배열인지가 의문..
  //정정: files 초기값을 빈 배열로 잡아놓았다. 그래서 빈 배열을 스프레드 연산자로 복제하고 file 을 담는다
  //빈 배열에 데이터 넣고 downloadId 를 넣고 나오다
  const download1 = (file) =>
    setFiles(function(fileList) {console.log("FileList",fileList) ;return [...fileList, { ...file, downloadId: uuid() }]}
    );
  

  const remove = (removeId) =>
    setFiles((files) => [
      ...files.filter((file) => file.downloadId !== removeId),
    ]);

  return [
    
    (e) => download1(e),  //빈 배열에 file 을 담는다. 그걸 setFiles 해서 files 에는 하나의 데이터가 담겨있다
    files.length > 0 ? (  //버튼을 누르면 길이는 0 이상이라서 Downloader 가 실행된다.
      <Downloader files={files} remove={(e) => remove(e)} />
    ) :null
  
  ];
};

export default useFileDownloader;
