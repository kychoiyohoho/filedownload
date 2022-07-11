import React, { useEffect, useState } from "react";
import "./index.css";
import { ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";

const Downloader = ({ files = [], remove }) => {
  return (
    // 다운로드 진행중일때 나오는 Card, 파일을 DownloadItem 으로 전달
    <div className="downloader">
      <div className="card">
        <div className="card-header">File Downloader</div>
        <ul className="list-group list-group-flush">
          {files.map((file, idx) => (
            <DownloadItem
              key={idx}
              removeFile={() => remove(file.downloadId)}
              {...file}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
//DownloadItem 은 file 을 map 으로 전달받았따
//화살표 함수이고 이 안에 return 문이 들어감
const DownloadItem = ({ name, file, filename, removeFile }) => {
  console.log("removeFile",removeFile);
  //downloadInfo setting
  const [downloadInfo, setDownloadInfo] = useState({
    progress: 0,
    completed: false,
    total: 0,
    loaded: 0,
  });

  useEffect(() => {
    //options 를 둔 이유는 뭐지?
    //onDownloadProgress 는 진행바 사용하기 위해 그냥 붙여넣기 
    const options = {
      onDownloadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;

        setDownloadInfo({
          progress: Math.floor((loaded * 100) / total),
          loaded,
          total,
          completed: false,
        });
      },
    };
//file 은 그냥 파일, 일반적으로 url 을 날려서 다운받는데, 여기선 파일을 그대로 명시해서 그걸 다운받게 하다
console.log("options",options);
    Axios.get(file, {
      responseType: "blob", //응답데이터 정의
      ...options,
    }).then(function (response) {
      console.log("response",response);
//자바스크립트문법, 파일 다운로드 
      const url = window.URL.createObjectURL(
        //다운받는 데이터를 Binary 로 저장합니다
        //특정타입을 정해야 할 경우 유형을 정의할 수 있씁니다
        new Blob([response.data], {
          type: response.headers["content-type"],
        })
      );
      console.log("url",url); //blob ::http://localhost:3000/4db4a850-4b44-4d29-8d08-84c035d6bf1e
      const link = document.createElement("a");
      link.href = url;
      //자바스크립트 a 태그 속성에 download=파일이름을 줄 수 있습니다
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      setDownloadInfo((info) => ({
        ...info,
        completed: true,
      }));

      setTimeout(() => {
        removeFile();
      }, 4000);
    });
  }, []);

  const formatBytes = (bytes) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-12 d-flex">
          <div className="d-inline font-weight-bold text-truncate">{name}</div>
          <div className="d-inline ml-2">
            <small>
              {downloadInfo.loaded > 0 && (
                <>
                  <span className="text-success">
                    {formatBytes(downloadInfo.loaded)}
                  </span>
                  / {formatBytes(downloadInfo.total)}
                </>
              )}

              {downloadInfo.loaded === 0 && <>Initializing...</>}
            </small>
          </div>
          <div className="d-inline ml-2 ml-auto">
            {downloadInfo.completed && (
              <span className="text-success">
                Completed <FontAwesomeIcon icon="check-circle" />
              </span>
            )}
          </div>
        </div>
        <div className="col-12 mt-2">
          <ProgressBar
            variant="success"
            now={downloadInfo.progress}
            striped={true}
            label={`${downloadInfo.progress}%`}
          />
        </div>
      </div>
    </li>
  );
};

export default Downloader;
