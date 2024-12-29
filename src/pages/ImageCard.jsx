import React from "react";
import { styled } from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FileSaver from "file-saver";

const Card = styled.div`
   position: relative;
  display: flex;
  cursor: pointer;
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
  border-radius: 15px;
  gap: 5px;
  backdrop-filter: blur(8px);
  background-color: #253b5070;
  transition: opacity 0.3s ease-in;
  overflow: hidden;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-size: 15px;
  @media (max-width: 699px) {
    font-size: 12px;
  }
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

const ProfilePict = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  overflow: hidden;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DownloadBtn = styled.div`
  cursor: pointer;
`;

const ImageCard = ({ post }) => {
  return (
    <Card>
      <LazyLoadImage
        src={post.url?.startsWith("http://") ? post.url.replace("http://", "https://") : post.url}
        alt="Generated image"
        width={"100%"} style={{borderRadius:"15px"}}
      />
      <HoverOverlay>
        <Prompt>{post.prompt}</Prompt>
        <BottomWrapper>
          <Author>
            <ProfilePict>
              <img
                src={
                  post.user?.profilePic?.startsWith("http://")
                    ? post.user.profilePic.replace("http://", "https://")
                    : post.user?.profilePic || "images/user.png"
                }
                alt="Author"
                style={{
                  height: "100%",
                  width: "fit-content",
                  maxWidth: "25px",
                }}
              />
            </ProfilePict>
            {post.user?.name || "Unknown"}
          </Author>
          <DownloadBtn onClick={() => FileSaver.saveAs(post.url, "download.jpg")}>
            <img src="images/download.png" alt="Download" style={{ height: "22px" }} />
          </DownloadBtn>
        </BottomWrapper>
      </HoverOverlay>
    </Card>
  );
};

export default ImageCard;
