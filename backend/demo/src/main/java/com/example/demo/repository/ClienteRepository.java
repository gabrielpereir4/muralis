package com.example.demo.repository;

import com.example.demo.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Busca por nome ou CPF
    List<Cliente> findByNomeContainingIgnoreCaseOrCpfContaining(String nome, String cpf);
    // Verifica se CPF existe
    boolean existsByCpf(String cpf);
    Optional<Cliente> findByCpf(String cpf);
}
