import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.jupiter.api.Assertions.*;

class ScholarshipSmokeTest {

    @Test
    void frontendShouldLoadSuccessfully() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new");
        options.addArguments("--window-size=1440,1000");

        WebDriver driver = new ChromeDriver(options);

        try {
            driver.get("http://localhost:8081");

            assertTrue(
                driver.getCurrentUrl().startsWith("http://localhost:8081"),
                "Frontend should open at port 8080"
            );

            assertFalse(
                driver.findElement(org.openqa.selenium.By.tagName("body"))
                      .getText().trim().isEmpty(),
                "Frontend should display page content"
            );

            System.out.println("Page title: " + driver.getTitle());
            System.out.println("Frontend loaded successfully.");
        } finally {
            driver.quit();
        }
    }
}
