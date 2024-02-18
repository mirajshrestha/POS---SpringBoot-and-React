//package config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.provisioning.InMemoryUserDetailsManager;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http.authorizeHttpRequests((requests) -> requests.requestMatchers("/api/superadmin/login").permitAll()
//				.anyRequest().authenticated()).formLogin((form) -> form.permitAll())
//				.logout((logout) -> logout.logoutUrl("/api/superadmin/logout").logoutSuccessUrl("/").permitAll());
//
//		return http.build();
//	}
//
//	@Bean
//	public UserDetailsService userDetailsService() {
//		UserDetails user = User.builder().username("admin").password("admin").roles("USER")
//				.build();
//		return new InMemoryUserDetailsManager(user);
//	}
//	
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//}
