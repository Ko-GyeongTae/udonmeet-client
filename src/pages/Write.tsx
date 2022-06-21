/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { PhotoCamera } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import PostController from "../utils/api/post";
import UploadController from "../utils/api/upload";
import { useNavigate } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Write() {
  const assetInput = useRef<HTMLInputElement>(null);
  const [asset, setAsset] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("");
  const navigate = useNavigate();
  const postController = new PostController();
  const uploadController = new UploadController();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    postController
      .createPost({
        title: data.get("title") as string,
        content: data.get("content") as string,
        place: data.get("place") as string,
        location: data.get("location") as string,
        assetUrl: asset ? asset : "",
      })
      .then(() => {
        alert("게시글 작성에 성공했습니다.");
        navigate("/");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const handleImage = (event: any) => {
    const formData = new FormData();
    formData.append("images", event.target.files[0]);
    // axios
    //   .post(`http://localhost:4102/upload/list`, formData)
    //   .then((res) => {
    //     console.log(res.data[0]);
    //     setAsset(res.data[0]);
    //   })
    //   .catch((e) => {
    //     alert(e);
    //   });
    uploadController
      .createPost(formData)
      .then((res) => {
        console.log(res?.data);
        setAsset(res?.data[0]);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const deleteImage = (event: any) => {
    setAsset(null);
  };

  const clickUpload = () => {
    assetInput.current?.click();
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (position: any) => {
    const { latitude, longitude } = position.coords;

    axios
      .get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.documents[0].address);
        const { region_1depth_name, region_2depth_name, region_3depth_name } =
          res.data.documents[0].address;

        setLocation(
          `${region_1depth_name} ${region_2depth_name} ${region_3depth_name}`
        );
      })
      .catch((e) => alert(e));
  };

  const error = (err: any) => {
    alert("위치권한을 확인해주세요");
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="inherit"></AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="left"
              sx={{ margin: 4 }}
              color="text.primary"
              gutterBottom
            >
              게시글 작성
            </Typography>
          </Container>
          <Container
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
          >
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                required
                id="title"
                name="title"
                variant="outlined"
                label="제목"
                autoFocus
              />
              <TextField
                required
                id="place"
                name="place"
                variant="outlined"
                label="약속장소"
              />
              <TextField
                required
                id="content"
                name="content"
                label="내용"
                placeholder="내용을 입력해주세요"
                multiline
                rows={10}
                variant="outlined"
                fullWidth
              />
              <TextField
                id="location"
                name="location"
                label="현재위치"
                value={location}
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  readOnly: true,
                }}
              />

              <input
                required
                type="file"
                style={{ display: "none" }}
                className="imgInput"
                id="assetUrl"
                name="assetUrl"
                accept="image/*"
                ref={assetInput}
                onChange={handleImage}
              />
              <Button
                variant="contained"
                onClick={clickUpload}
                disabled={asset !== null ? true : false}
                sx={{ margin: 1 }}
                startIcon={<PhotoCamera />}
              >
                선물 이미지 선택
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ margin: 1, mr: 0 }}
                startIcon={<DeleteIcon />}
                onClick={deleteImage}
              >
                이미지 삭제
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
              <Container
                component="div"
                maxWidth="lg"
                sx={{ width: "100%", alignItems: "center" }}
              >
                <img
                  src={asset!}
                  alt="img"
                  style={{ width: "40vh", height: "auto" }}
                />
              </Container>
            </Box>
          </Container>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
