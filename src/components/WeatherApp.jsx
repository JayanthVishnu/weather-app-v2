import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
import {
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import { useState } from "react";

// Import the font
const fontStyle = {
  fontFamily: "'Lilita One', cursive",
};

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    const apiKey = import.meta.env.VITE_API_KEY; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(err.message);
      setWeatherData(null); // Clear previous weather data
    }
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeather();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Determine the weather image or blank state based on the weather condition
  const getWeatherImageOrBlank = () => {
    if (!weatherData) {
      return null; // No image in the default state
    }
    const condition = weatherData.weather[0].main;
    switch (condition) {
      case "Clear":
        return <img src={sunny} alt="sunny" style={imageStyle} />;
      case "Clouds":
        return <img src={cloudy} alt="cloudy" style={imageStyle} />;
      case "Rain":
        return <img src={rainy} alt="rainy" style={imageStyle} />;
      case "Snow":
        return <img src={snowy} alt="snowy" style={imageStyle} />;
      default:
        return null; // No image for unknown conditions
    }
  };

  const imageStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "150%",
    maxWidth: "1000px", // Adjust image size for responsiveness
    height: "auto",
    zIndex: 2,
    pointerEvents: "none",
  };

  // Determine the background and box styles based on the weather condition
  const getWeatherStyles = () => {
    if (!weatherData) {
      return {
        background: "linear-gradient(to right, #d4f1d4, #e8fce8)", // Default white+green mix background
        boxBackground: "linear-gradient(to top, #d4f1d4, #e8fce8)", // Default white+green mix box background
      };
    }
    const condition = weatherData.weather[0].main;
    switch (condition) {
      case "Clear":
        return {
          background: "linear-gradient(to right, #f3b07c, #fcd283)", // Sunny background
          boxBackground: "linear-gradient(to top, #f3b07c, #fcd283)", // Sunny box background
        };
      case "Clouds":
        return {
          background: "linear-gradient(to right, #87ceeb, #b0e0e6)", // Sky blue background
          boxBackground: "linear-gradient(to top, #87ceeb, #b0e0e6)", // Sky blue box background
        };
      case "Rain":
        return {
          background: "linear-gradient(to right, #4682b4, #5f9ea0)", // Blue background
          boxBackground: "linear-gradient(to top, #4682b4, #5f9ea0)", // Blue box background
        };
      case "Snow":
        return {
          background: "linear-gradient(to right, #e0f7fa, #b3e5fc)", // White with blue mix background
          boxBackground: "linear-gradient(to top, #e0f7fa, #b3e5fc)", // White with blue mix box background
        };
      default:
        return {
          background: "linear-gradient(to right, #d4f1d4, #e8fce8)", // Default white+green mix background
          boxBackground: "linear-gradient(to top, #d4f1d4, #e8fce8)", // Default white+green mix box background
        };
    }
  };

  const { background, boxBackground } = getWeatherStyles();

  return (
    <>
      {/* Import Google Font */}
      <style>
        {`@import url("https://fonts.googleapis.com/css2?family=Lilita+One&display=swap");`}
      </style>

      <Box
        sx={{
          width: "100%",
          height: "100vh",
          background: background,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
          padding: { xs: "1rem", sm: "2rem" }, // Add padding for smaller screens
        }}
      >
        {/* Dynamic Weather Image or Blank */}
        {getWeatherImageOrBlank()}

        <Paper
          elevation={5}
          sx={{
            width: "100%",
            maxWidth: "28rem",
            height: "60%",
            background: boxBackground,
            borderRadius: "2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: { xs: 2, sm: 3 }, // Adjust padding for responsiveness
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <LocationOnIcon sx={{ fontSize: 26, color: "#2f2e57" }} />
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                  color: "#2f2e57",
                  letterSpacing: 0.5,
                  ...fontStyle,
                }}
              >
                {city || "Enter a city"}
              </Typography>
            </Box>
            <TextField
              variant="outlined"
              placeholder="Search for a city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress} // Trigger search on Enter key
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "2.5rem",
                  fontSize: "1rem",
                  color: "#2f2e57",
                  ...fontStyle,
                  "&:focus-within": {
                    outline: "none",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#2f2e57",
                  fontSize: "0.9rem",
                  letterSpacing: "0.1rem",
                  ...fontStyle,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon
                      sx={{ fontSize: 18, color: "#2f2e57", cursor: "pointer" }}
                      onClick={handleSearch}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {error && (
            <Typography
              sx={{
                color: "red",
                fontSize: "1rem",
                mt: 2,
                ...fontStyle,
              }}
            >
              {error}
            </Typography>
          )}

          <Box sx={{ mt: 20, textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.6rem" },
                color: "#2f2e57",
                mt: 0,
                ...fontStyle,
              }}
            >
              {weatherData ? weatherData.weather[0].main : "N/A"}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "3rem", sm: "6rem" },
                background: "linear-gradient(to right, #2f2e57, #2f2e57)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0.3rem 0.3rem 0.6rem rgba(0, 0, 0, 0.2)",
                ...fontStyle,
              }}
            >
              {weatherData ? Math.round(weatherData.main.temp) : 0}°C
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1.5rem" },
              color: "#484569",
              mt: 0,
              ...fontStyle,
            }}
          >
            {weatherData
              ? new Date(weatherData.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })
              : "N/A"}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "15%",
              mt: "5%",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                background: "rgba(255, 255, 255, 0.2)",
                p: 1.5,
                borderRadius: 2,
                width: "40%",
                maxWidth: "150px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "#2f2e57",
                  ...fontStyle,
                }}
              >
                Humidity
              </Typography>
              <WaterDropIcon
                sx={{
                  fontSize: 28,
                  color: "#2f2e57",
                }}
              />
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  color: "#2f2e57",
                  ...fontStyle,
                }}
              >
                {weatherData ? weatherData.main.humidity : 0} %
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                background: "rgba(255, 255, 255, 0.2)",
                p: 1.5,
                borderRadius: 2,
                width: "40%",
                maxWidth: "150px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "#2f2e57",
                  ...fontStyle,
                }}
              >
                Wind
              </Typography>
              <AirIcon
                sx={{
                  fontSize: 28,
                  color: "#2f2e57",
                }}
              />
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  color: "#2f2e57",
                  ...fontStyle,
                }}
              >
                {weatherData ? Math.round(weatherData.wind.speed) : 0} Km/h
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default WeatherApp;
