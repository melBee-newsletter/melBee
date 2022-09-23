import React, { useState, useEffect } from "react";
import { useCSVReader, formatFileSize } from "react-papaparse";
import { styles, DEFAULT_REMOVE_HOVER_COLOR, REMOVE_HOVER_COLOR_LIGHT } from "./CSVReaderStyle"
import { addContact } from "../../../api";

type Props = {
  setContactList: Function;
};

const CSVReader: React.FC<Props> = ({ setContactList }) => {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(DEFAULT_REMOVE_HOVER_COLOR);
  const [csvData, setCsvData] = useState([]);

  const addCsvToContacts = async (email: string[]) => {
    const newContact = await addContact(email);
    if (newContact) setContactList((prevEmail: string[]) => [...prevEmail, email]);
  };

  useEffect(() => {
    function checkIfEmail(data: string) {
      const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      return regexExp.test(data);
    }
    for (let i = 0; i < csvData.length; i++) {
      if (checkIfEmail(csvData[i][0])) addCsvToContacts(csvData[i][0]);
    };
  }, [csvData]);

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        setCsvData(results.data);
        setZoneHover(false);
      }}
      onDragOver={(event: DragEvent) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event: DragEvent) => {
        event.preventDefault();
        setZoneHover(false);
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
        Remove,
      }: any) => (
        <>
          <div
            {...getRootProps()}
            style={Object.assign(
              {},
              styles.zone,
              zoneHover && styles.zoneHover
            )}
          >
            {acceptedFile ? (
              <>
                <div style={styles.file}>
                  <div style={styles.info}>
                    <span style={styles.size}>
                      {formatFileSize(acceptedFile.size)}
                    </span>
                    <span style={styles.name}>{acceptedFile.name}</span>
                  </div>
                  <div style={styles.progressBar}>
                    <ProgressBar />
                  </div>
                  <div
                    {...getRemoveFileProps()}
                    style={styles.remove}
                    onMouseOver={(event: Event) => {
                      event.preventDefault();
                      setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                    }}
                    onMouseOut={(event: Event) => {
                      event.preventDefault();
                      setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                    }}
                  >
                    <Remove color={removeHoverColor} />
                  </div>
                </div>
              </>
            ) : (
              "クリックまたはファイルをドロップしてください"
            )}
          </div>
        </>
      )}
    </CSVReader>
  );
};

export default CSVReader;
