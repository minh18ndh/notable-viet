package io.minh18ndh.github.notableviet;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VietRepository extends MongoRepository<Viet, ObjectId> {
}
