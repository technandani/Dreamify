import React from "react";
import { styled } from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FileSaver from "file-saver";

const Card = styled.div`
  position: relative;
  display: flex;
  transition: all 0.3s ease;
  border-radius: 15px;
  &:hover {
    /* scale: 1.05; */
  }

  &:nth-child(7n + 1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;

const HoverOverlay = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
  padding: 5%;
  border-radius: inherit;
  gap: 5px;
  backdrop-filter: blur(8px);
  background-color: #253b5070;
  transition: opacity 0.3s ease-in;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-size: 15px;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 17px;

  @media (max-width: 699px) {
    font-size: 13px;
  }
`;

const DownloadBtn = styled.div`
  cursor: pointer;
`;

const ImageCard = ({ images }) => {
  return (
    <>
      {images.length === 0 ? (
        <p>Loading...</p>
      ) : (
        images.map((image, index) => (
          <Card key={image.url}> {/* Added key here */}
            <LazyLoadImage
              src={
                image.url.startsWith("http://")
                  ? image.url.replace("http://", "https://")
                  : image.url
              }
              alt={`Generated image ${index}`}
              width={"100%"}
              style={{ borderRadius: "15px" }}
            />
            <HoverOverlay>
              <Prompt>{image.prompt}</Prompt>
              <BottomWrapper>
                <Author>
                  <img
                    src="images/woman.png"
                    alt=""
                    style={{ height: "25px" }}
                  />
                  Nandani
                </Author>
                <DownloadBtn
                  onClick={() => FileSaver.saveAs(image.url, "download.jpg")}
                >
                  <img
                    src="images/download.png"
                    alt=""
                    style={{ height: "22px" }}
                  />
                </DownloadBtn>
              </BottomWrapper>
            </HoverOverlay>
          </Card>
        ))
      )}
    </>
  );
};

export default ImageCard;
