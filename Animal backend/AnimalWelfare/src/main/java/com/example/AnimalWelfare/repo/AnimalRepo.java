package com.example.AnimalWelfare.repo;

import com.example.AnimalWelfare.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepo extends JpaRepository<Animal,Long> {
}
