
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card/80 text-foreground py-4 shadow-inner mt-auto border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-center md:text-left">
              © {year} Kiddie Stock Adventures - A fun way to learn about stocks!
            </p>
          </div>
          
          <div className="flex gap-2 justify-center">
            <Button
              variant="link"
              className="text-foreground"
              size="sm"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              variant="link"
              className="text-foreground"
              size="sm"
              onClick={() => navigate("/learn")}
            >
              Learn
            </Button>
            <Button
              variant="link"
              className="text-foreground"
              size="sm"
              onClick={() => navigate("/trade")}
            >
              Trade
            </Button>
            <Button
              variant="link"
              className="text-foreground"
              size="sm"
              onClick={() => navigate("/portfolio")}
            >
              Portfolio
            </Button>
          </div>
        </div>
        
        <div className="mt-4 md:mt-2 flex justify-center md:justify-end">
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-white/20 hover:bg-muted"
            onClick={() => navigate("/parents")}
          >
            Parents Area
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
