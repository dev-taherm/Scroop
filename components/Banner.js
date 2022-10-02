/** @jsxRuntime classic */
/** @jsx jsx */
import {
  jsx,
  Box,
  Container,
  Heading,
  Text,
  Label,
  
  Button,
  
} from "theme-ui";
import banner from "/assets/imgs/landing.jpg";
import 'bootstrap/dist/css/bootstrap.css';
import { rgba } from "polished";
import Image from "next/image";
import Link from "next/link";





const Banner = () => {
  return (
    <Box as="section" id="home" sx={styles.section}>
      <Container>
        <Box sx={styles.contentWrapper}>
          <Box as="figure" sx={styles.illustration}>
            <Image src={banner} alt="banner" />
          </Box>
          <Box sx={styles.content}>
            <Heading as="h1">
              Build your audience &amp; grow your business online smarter
            </Heading>
            <Text as="p">
              Get your blood tests delivered at let home collect sample from the
              victory of the managements that supplies best design system
              guidelines ever.
            </Text>
            <Box sx={styles.subscribe}>
              <Link as="link" variant="styles.srOnly" href="/collections">
                تسوق الان
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;

const styles = {
  contentWrapper: {
    display: ["block", null, null, null, "grid", "flex"],
    gridTemplateColumns: ["1fr 1fr", null, null, null, "0.9fr 1.1fr"],
    gap: [0, 0, 0, 0, 40],
    minHeight: [null, null, "100vh", "70vh", "100vh", "100vh"],
    pt: ["100px", null, null, "130px", "25px", null, 0],
    textAlign: ["right", null, "right"],
  },
  content: {
    maxWidth: [null, null, null, "45%", "50%"],
    margin: [10, null, null, 20, 0],
    textAlign: ["center", null, null, "right", "right"],
    justifyContent: "right",
    position: "relative",
    top: "0px",    
    backdropFilter: "blur(5px)",
    h1: {
      color: "textSecondary",
      fontFamily: "Crimson Text, Serif",
      fontWeight: 600,
      fontSize: ["34px", "34px", "34px", "44px", "40px", "49px", "62px"],
      lineHeight: [1.26, 1.26, 1.11, 1.4, 1.11],
    },
    p: {
      maxWidth: [450, null, null, "none", 450],
      fontSize: ["14px", null, "18px", 17, "16px", "15px", "18px"],
      lineHeight: [1.87, 1.87, 2.33, 2.33, 2],
      mt: ["25px", null, null, null, 4],
    },
  },
  subscribe: {
    display: "flex",
    alignItems: ["center", null, null, null, "left", "left"],
    mt: ["30px"],
    justifyContent: ["center", null, null, null, "left", "left"],
  },
  sponsoredBy: {
    display: "flex",
    alignItems: "center",
    justifyContent: ["center", null, null, null, "unset"],
    mt: ["30px", "30px", "40px", "40px", "30px"],
    span: {
      color: rgba("#566272", 0.6),
      fontSize: ["14px", "16px", "16px"],
    },
  },
  logos: {
    display: "flex",
    alignItems: "center",
    figure: {
      ml: ["10px", "16px", "28px", "16px", "16px"],
    },
    img: {
      maxWidth: ["69px", "85px", "100%", "100%", "79px", "100px", "100%"],
    },
  },
  illustration: {
    ml: [0, 0, "30px", 0, 0],
    mt: ["100px", null, null, null, 0],
    minWidth: ["auto", null, null, null, null, "600px"],
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    position: ["absolute", null, null, null, null, null],
    top: "50px",
    left: "0px",
    img: {
      maxWidth: ["100%", null, null, "80%", "100%"],
    },
  },
};
