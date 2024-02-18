package config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
	@Bean
	public CorsFilter corsFilter(){
		var urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		var corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000"));
		
		corsConfiguration.addAllowedHeader("*");
		corsConfiguration.addAllowedMethod("*");
		
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		
		return new CorsFilter((CorsConfigurationSource) urlBasedCorsConfigurationSource);
	}
}
