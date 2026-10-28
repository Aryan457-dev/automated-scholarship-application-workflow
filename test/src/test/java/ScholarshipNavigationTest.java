import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.jupiter.api.Assertions.*;

class ScholarshipNavigationTest {

    private WebDriver createDriver() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new");
        options.addArguments("--window-size=1440,1000");
        return new ChromeDriver(options);
    }

    @Test
    void dashboardShouldDisplayScholarFlowBranding() {
        WebDriver driver = createDriver();

        try {
            driver.get("http://localhost:8081");

            assertTrue(
                driver.findElement(By.tagName("body"))
                      .getText().contains("ScholarFlow"),
                "Dashboard should display ScholarFlow branding"
            );

            assertTrue(
                driver.findElement(By.tagName("h1"))
                      .getText().contains("Your future starts here."),
                "Dashboard welcome heading should be displayed"
            );
        } finally {
            driver.quit();
        }
    }

    @Test
    void scholarshipsNavigationShouldChangePageHeading() {
        WebDriver driver = createDriver();

        try {
            driver.get("http://localhost:8081");

            driver.findElement(
                By.xpath("//nav//button[contains(., 'Scholarships')]")
            ).click();

            assertTrue(
                driver.findElement(By.tagName("h1"))
                      .getText().contains("Explore scholarships."),
                "Scholarships page heading should be displayed"
            );

            assertTrue(
                driver.findElement(By.tagName("body"))
                      .getText().contains("Featured scholarships"),
                "Scholarships section should be displayed"
            );
        } finally {
            driver.quit();
        }
    }
}
