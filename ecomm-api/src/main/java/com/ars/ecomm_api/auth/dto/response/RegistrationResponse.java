package com.ars.ecomm_api.auth.dto.response;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistrationResponse {

    @Min(value = 100, message = "Response code must be at least 100")
    @Max(value = 599, message = "Response code must not exceed 599")
    private int code;

    @NotBlank(message = "Response message is required")
    private String message;
}