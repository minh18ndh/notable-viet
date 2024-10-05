package io.minh18ndh.github.notableviet;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VietService {
    @Autowired
    private VietRepository vietRepository;
    public List<Viet> allViets() {

        return vietRepository.findAll();
    }

//    public Optional<Viet> singleViet(ObjectId id) {
//
//        return vietRepository.findById(id);
//    }
}
